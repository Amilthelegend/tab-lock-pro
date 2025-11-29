// Tab Lock Pro - Background Service Worker
// Version 1.0.0

// Storage keys
const STORAGE_KEYS = {
  LOCKED_TABS: 'lockedTabs',
  PASSWORD_HASH: 'passwordHash',
  BIOMETRIC_ENABLED: 'biometricEnabled',
  IS_PRO: 'isPro',
  PRO_KEY: 'proKey',
  AUTO_LOCK_TIME: 'autoLockTime',
  TIME_BASED_LOCKS: 'timeBasedLocks',
  DOMAIN_LOCKS: 'domainLocks',
  INCOGNITO_LOCK: 'incognitoLock',
  STEALTH_MODE: 'stealthMode',
  SESSION_PERSIST: 'sessionPersist'
};

// Initialize extension
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Tab Lock Pro installed');
  
  // Initialize default settings
  const defaults = {
    [STORAGE_KEYS.LOCKED_TABS]: {},
    [STORAGE_KEYS.IS_PRO]: false,
    [STORAGE_KEYS.BIOMETRIC_ENABLED]: false,
    [STORAGE_KEYS.AUTO_LOCK_TIME]: 0,
    [STORAGE_KEYS.TIME_BASED_LOCKS]: [],
    [STORAGE_KEYS.DOMAIN_LOCKS]: [],
    [STORAGE_KEYS.INCOGNITO_LOCK]: false,
    [STORAGE_KEYS.STEALTH_MODE]: false,
    [STORAGE_KEYS.SESSION_PERSIST]: false
  };
  
  for (const [key, value] of Object.entries(defaults)) {
    const existing = await chrome.storage.local.get(key);
    if (existing[key] === undefined) {
      await chrome.storage.local.set({ [key]: value });
    }
  }
  
  // Check if Pro and update icon
  checkProStatusAndUpdateIcon();
});

// On startup, check if Pro and update icon
chrome.runtime.onStartup.addListener(async () => {
  checkProStatusAndUpdateIcon();
});

// Check Pro status and update icon accordingly
async function checkProStatusAndUpdateIcon() {
  const settings = await chrome.storage.local.get([STORAGE_KEYS.IS_PRO]);
  if (settings[STORAGE_KEYS.IS_PRO]) {
    await updateIconToGold();
  }
}

// Track locked tabs
let lockedTabs = {};
let tabLastActivity = {};

// Load locked tabs on startup
chrome.storage.local.get([STORAGE_KEYS.LOCKED_TABS], (result) => {
  if (result[STORAGE_KEYS.LOCKED_TABS]) {
    lockedTabs = result[STORAGE_KEYS.LOCKED_TABS];
  }
});

// Listen for tab activation
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tabId = activeInfo.tabId;
  
  try {
    const tab = await chrome.tabs.get(tabId);
    
    // Skip if already showing locked screen
    if (tab.url && tab.url.includes('locked.html')) {
      return;
    }
    
    // Check if tab is locked
    if (lockedTabs[tabId]) {
      // Inject locked screen
      await injectLockedScreen(tabId, tab.url);
    }
    
    // Check for incognito lock (Pro feature)
    const settings = await chrome.storage.local.get([
      STORAGE_KEYS.INCOGNITO_LOCK,
      STORAGE_KEYS.IS_PRO
    ]);
    
    if (settings[STORAGE_KEYS.IS_PRO] && settings[STORAGE_KEYS.INCOGNITO_LOCK]) {
      if (tab.incognito && !lockedTabs[tabId]) {
        // Auto-lock incognito tabs
        await lockTab(tabId, tab.url);
      }
    }
  } catch (error) {
    console.error('Error in tab activation:', error);
  }
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Skip if this is our locked screen URL
  if (tab.url && tab.url.includes('chrome-extension://') && tab.url.includes('locked.html')) {
    return;
  }
  
  if (changeInfo.status === 'loading' && lockedTabs[tabId]) {
    // Tab is locked and navigating away - re-lock it
    const currentUrl = tab.url || changeInfo.url;
    if (!currentUrl.includes('locked.html')) {
      await injectLockedScreen(tabId, currentUrl);
    }
  }
  
  // Check domain-based auto-lock (Pro feature)
  if (changeInfo.url && !changeInfo.url.includes('locked.html')) {
    const settings = await chrome.storage.local.get([
      STORAGE_KEYS.DOMAIN_LOCKS,
      STORAGE_KEYS.IS_PRO
    ]);
    
    if (settings[STORAGE_KEYS.IS_PRO] && settings[STORAGE_KEYS.DOMAIN_LOCKS]) {
      const domainLocks = settings[STORAGE_KEYS.DOMAIN_LOCKS];
      try {
        const url = new URL(changeInfo.url);
        const domain = url.hostname;
        
        // Check if domain should be auto-locked
        for (const lockDomain of domainLocks) {
          if (domain.includes(lockDomain) && !lockedTabs[tabId]) {
            await lockTab(tabId, changeInfo.url);
            break;
          }
        }
      } catch (e) {
        // Invalid URL, skip
      }
    }
  }
  
  // Update last activity
  tabLastActivity[tabId] = Date.now();
});

// Listen for tab removal
chrome.tabs.onRemoved.addListener((tabId) => {
  if (lockedTabs[tabId]) {
    delete lockedTabs[tabId];
    saveLocked();
  }
  delete tabLastActivity[tabId];
});

// Lock a tab
async function lockTab(tabId, originalUrl) {
  // Don't lock if already locked
  if (lockedTabs[tabId]) {
    return;
  }
  
  // Don't lock chrome:// or extension URLs
  if (originalUrl.startsWith('chrome://') || 
      originalUrl.startsWith('chrome-extension://') ||
      originalUrl.startsWith('edge://') ||
      originalUrl.includes('locked.html')) {
    return;
  }
  
  lockedTabs[tabId] = {
    locked: true,
    originalUrl: originalUrl,
    timestamp: Date.now()
  };
  
  await saveLocked();
  await injectLockedScreen(tabId, originalUrl);
  
  // Update badge
  updateBadge();
}

// Unlock a tab
async function unlockTab(tabId) {
  if (!lockedTabs[tabId]) return;
  
  const originalUrl = lockedTabs[tabId].originalUrl;
  delete lockedTabs[tabId];
  
  await saveLocked();
  
  // Navigate back to original URL
  try {
    await chrome.tabs.update(tabId, { url: originalUrl });
  } catch (error) {
    console.error('Error unlocking tab:', error);
  }
  
  updateBadge();
}

// Inject locked screen
async function injectLockedScreen(tabId, originalUrl) {
  const settings = await chrome.storage.local.get([STORAGE_KEYS.STEALTH_MODE]);
  const stealthMode = settings[STORAGE_KEYS.STEALTH_MODE] || false;
  
  try {
    // Don't inject on chrome:// or extension pages
    if (originalUrl && (
        originalUrl.startsWith('chrome://') || 
        originalUrl.startsWith('chrome-extension://') ||
        originalUrl.startsWith('edge://') ||
        originalUrl.includes('locked.html')
    )) {
      return;
    }
    
    const lockedUrl = chrome.runtime.getURL('locked.html') + `?tab=${tabId}&stealth=${stealthMode}`;
    
    // Only navigate if not already on locked screen
    const tab = await chrome.tabs.get(tabId);
    if (!tab.url.includes('locked.html')) {
      await chrome.tabs.update(tabId, { url: lockedUrl });
    }
  } catch (error) {
    console.error('Error injecting locked screen:', error);
  }
}

// Save locked tabs to storage
async function saveLocked() {
  await chrome.storage.local.set({ [STORAGE_KEYS.LOCKED_TABS]: lockedTabs });
}

// Update extension badge
function updateBadge() {
  const count = Object.keys(lockedTabs).length;
  
  if (count > 0) {
    chrome.action.setBadgeText({ text: count.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#FF6B6B' });
  } else {
    chrome.action.setBadgeText({ text: '' });
  }
}

// Auto-lock timer (Pro feature)
chrome.alarms.create('autoLockCheck', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'autoLockCheck') {
    const settings = await chrome.storage.local.get([
      STORAGE_KEYS.AUTO_LOCK_TIME,
      STORAGE_KEYS.IS_PRO,
      STORAGE_KEYS.TIME_BASED_LOCKS
    ]);
    
    if (!settings[STORAGE_KEYS.IS_PRO]) return;
    
    const autoLockTime = settings[STORAGE_KEYS.AUTO_LOCK_TIME] || 0;
    const now = Date.now();
    
    // Check for inactive tabs
    if (autoLockTime > 0) {
      const tabs = await chrome.tabs.query({});
      
      for (const tab of tabs) {
        const lastActivity = tabLastActivity[tab.id] || 0;
        const inactiveTime = now - lastActivity;
        
        // Auto-lock if inactive for specified time
        if (inactiveTime > autoLockTime * 60 * 1000 && !lockedTabs[tab.id]) {
          await lockTab(tab.id, tab.url);
        }
      }
    }
    
    // Check time-based locks
    const timeBasedLocks = settings[STORAGE_KEYS.TIME_BASED_LOCKS] || [];
    const currentHour = new Date().getHours();
    
    for (const timeLock of timeBasedLocks) {
      if (timeLock.enabled && currentHour >= timeLock.startHour && currentHour < timeLock.endHour) {
        // Lock all unlocked tabs during work hours
        const tabs = await chrome.tabs.query({});
        for (const tab of tabs) {
          if (!lockedTabs[tab.id]) {
            await lockTab(tab.id, tab.url);
          }
        }
      }
    }
  }
});

// Message listener for popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    switch (request.action) {
      case 'lockTab':
        await lockTab(request.tabId, request.url);
        sendResponse({ success: true });
        break;
        
      case 'unlockTab':
        await unlockTab(request.tabId);
        sendResponse({ success: true });
        break;
        
      case 'isLocked':
        sendResponse({ locked: !!lockedTabs[request.tabId] });
        break;
        
      case 'getLockedTabs':
        sendResponse({ lockedTabs: lockedTabs });
        break;
        
      case 'lockAllTabs':
        const allTabs = await chrome.tabs.query({});
        for (const tab of allTabs) {
          if (!lockedTabs[tab.id]) {
            await lockTab(tab.id, tab.url);
          }
        }
        sendResponse({ success: true, count: allTabs.length });
        break;
        
      case 'unlockAllTabs':
        const tabIds = Object.keys(lockedTabs).map(Number);
        for (const tabId of tabIds) {
          await unlockTab(tabId);
        }
        sendResponse({ success: true });
        break;
        
      case 'verifyPassword':
        const stored = await chrome.storage.local.get([STORAGE_KEYS.PASSWORD_HASH]);
        const hash = await hashPassword(request.password);
        sendResponse({ valid: hash === stored[STORAGE_KEYS.PASSWORD_HASH] });
        break;
        
      case 'setPassword':
        const newHash = await hashPassword(request.password);
        await chrome.storage.local.set({ [STORAGE_KEYS.PASSWORD_HASH]: newHash });
        sendResponse({ success: true });
        break;
        
      case 'hasPassword':
        const passwordData = await chrome.storage.local.get([STORAGE_KEYS.PASSWORD_HASH]);
        sendResponse({ hasPassword: !!passwordData[STORAGE_KEYS.PASSWORD_HASH] });
        break;
        
      case 'activatePro':
        // Verify the license key
        const isValid = await verifyLicenseKey(request.licenseKey);
        if (isValid) {
          await chrome.storage.local.set({
            [STORAGE_KEYS.IS_PRO]: true,
            [STORAGE_KEYS.PRO_KEY]: request.licenseKey
          });
          // Update icon to gold
          await updateIconToGold();
          sendResponse({ success: true });
        } else {
          sendResponse({ success: false, error: 'Invalid license key' });
        }
        break;
        
      case 'isPro':
        const proData = await chrome.storage.local.get([STORAGE_KEYS.IS_PRO]);
        sendResponse({ isPro: proData[STORAGE_KEYS.IS_PRO] || false });
        break;
        
      case 'updateIconGold':
        await updateIconToGold();
        sendResponse({ success: true });
        break;
        
      default:
        sendResponse({ error: 'Unknown action' });
    }
  })();
  
  return true; // Keep channel open for async response
});

// Update icon to gold for Pro users
async function updateIconToGold() {
  try {
    await chrome.action.setIcon({
      path: {
        '16': 'icons/icon16-gold.png',
        '32': 'icons/icon32-gold.png',
        '48': 'icons/icon48-gold.png',
        '128': 'icons/icon128-gold.png'
      }
    });
    console.log('Icon updated to gold (Pro)');
  } catch (error) {
    console.error('Error updating icon:', error);
  }
}

// Hash password using Web Crypto API
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Verify license key with Gumroad API
async function verifyLicenseKey(key) {
  // Master/Emergency license key - ONLY FOR YOU AND EMERGENCIES
  const MASTER_KEY = 'TABLOCKPRO-MASTER-2024-LIFETIME';
  
  // Check if it's the master key
  if (key === MASTER_KEY) {
    console.log('Master key activated');
    return true;
  }
  
  // Basic validation - key should be at least 10 characters
  if (!key || key.length < 10) {
    return false;
  }
  
  // Gumroad API Verification
  try {
    const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'product_id': 'dioCQl7F4gXFGuI7_mDyVQ==',
        'license_key': key,
        'increment_uses_count': 'false'
      })
    });
    
    const data = await response.json();
    
    // Gumroad returns success: true if valid
    if (data.success && data.purchase) {
      console.log('Valid Gumroad license key');
      return true;
    } else {
      console.log('Invalid Gumroad license key:', data.message || 'Unknown error');
      return false;
    }
  } catch (error) {
    console.error('License verification error:', error);
    // If API fails (network issue), accept any key 10+ characters as fallback
    // This prevents legitimate users from being locked out due to network issues
    return key.length >= 10;
  }
}

// Handle keyboard shortcuts (Pro feature - panic button)
if (chrome.commands && chrome.commands.onCommand) {
  chrome.commands.onCommand.addListener(async (command) => {
    if (command === 'panic-lock') {
      const settings = await chrome.storage.local.get([STORAGE_KEYS.IS_PRO]);
      if (settings[STORAGE_KEYS.IS_PRO]) {
        // Lock all tabs immediately
        const allTabs = await chrome.tabs.query({});
        for (const tab of allTabs) {
          if (!lockedTabs[tab.id]) {
            await lockTab(tab.id, tab.url);
          }
        }
      }
    }
  });
}

console.log('Tab Lock Pro background service worker loaded');

// Tab Lock Pro - Popup Script

let isPro = false;
let hasPassword = false;
let currentTab = null;
let lockedTabs = {};

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  await checkSetupStatus();
  await loadCurrentTab();
  await updateLockedTabsList();
  
  // Setup event listeners
  setupEventListeners();
  
  // Update UI based on Pro status
  updateProUI();
});

// Load settings
async function loadSettings() {
  const result = await chrome.storage.local.get(['isPro', 'passwordHash']);
  isPro = result.isPro || false;
  hasPassword = !!result.passwordHash;
}

// Check if setup is needed
async function checkSetupStatus() {
  if (!hasPassword) {
    showSection('setupSection');
  } else {
    showSection('mainSection');
  }
}

// Setup event listeners
function setupEventListeners() {
  // Setup
  document.getElementById('setupBtn').addEventListener('click', setupPassword);
  
  const setupPasswordInput = document.getElementById('setupPassword');
  const setupPasswordConfirm = document.getElementById('setupPasswordConfirm');
  
  if (setupPasswordInput) {
    setupPasswordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        setupPasswordConfirm.focus();
      }
    });
  }
  
  if (setupPasswordConfirm) {
    setupPasswordConfirm.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        setupPassword();
      }
    });
  }
  
  // Main actions
  document.getElementById('lockCurrentBtn').addEventListener('click', lockCurrentTab);
  document.getElementById('unlockCurrentBtn').addEventListener('click', unlockCurrentTab);
  document.getElementById('panicBtn').addEventListener('click', panicLockAll);
  document.getElementById('unlockAllBtn').addEventListener('click', unlockAllTabs);
  
  // Navigation
  document.getElementById('settingsBtn').addEventListener('click', () => showSection('settingsSection'));
  document.getElementById('backFromSettings').addEventListener('click', () => showSection('mainSection'));
  
  // Pro Settings button (only visible when Pro)
  const proSettingsBtn = document.getElementById('proSettingsBtn');
  if (proSettingsBtn) {
    proSettingsBtn.addEventListener('click', () => {
      showSection('settingsSection');
      // Scroll to Pro Settings section
      setTimeout(() => {
        const proCard = document.getElementById('proSettingsCard');
        if (proCard) {
          proCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }
  
  // Upgrade
  document.getElementById('upgradeBtn').addEventListener('click', showUpgradeModal);
  document.getElementById('buyNowBtn').addEventListener('click', openPaymentLink);
  document.getElementById('closeUpgradeModal').addEventListener('click', closeUpgradeModal);
  document.getElementById('alreadyHaveLicenseBtn').addEventListener('click', () => {
    closeUpgradeModal();
    document.getElementById('licenseModal').style.display = 'flex';
    document.getElementById('licenseKeyInput').focus();
  });
  
  // Direct activate license button
  const activateLicenseDirectBtn = document.getElementById('activateLicenseDirectBtn');
  if (activateLicenseDirectBtn) {
    activateLicenseDirectBtn.addEventListener('click', () => {
      document.getElementById('licenseModal').style.display = 'flex';
      document.getElementById('licenseKeyInput').focus();
    });
  }
  
  // License
  document.getElementById('closeLicenseModal').addEventListener('click', closeLicenseModal);
  document.getElementById('activateLicenseBtn').addEventListener('click', activateLicense);
  
  // Settings
  document.getElementById('biometricToggle').addEventListener('change', toggleBiometric);
  document.getElementById('autoLockSelect').addEventListener('change', updateAutoLock);
  document.getElementById('incognitoToggle').addEventListener('change', toggleIncognito);
  document.getElementById('stealthToggle').addEventListener('change', toggleStealth);
  document.getElementById('sessionToggle').addEventListener('change', toggleSession);
  document.getElementById('changePasswordBtn').addEventListener('click', changePassword);
  
  // Domain lock button (new design)
  document.getElementById('addDomainBtn').addEventListener('click', addDomain);
  
  // Schedule lock controls (new design)
  document.getElementById('scheduleEnabledToggle').addEventListener('change', toggleSchedule);
  document.getElementById('startHourSelect').addEventListener('change', updateSchedulePreview);
  document.getElementById('endHourSelect').addEventListener('change', updateSchedulePreview);
  document.getElementById('saveScheduleBtn').addEventListener('click', saveSchedule);
  
  // Load domain list and schedule
  loadDomainList();
  loadScheduleSettings();
  
  // Load settings values
  loadSettingsValues();
}

// Setup password
async function setupPassword() {
  const password = document.getElementById('setupPassword').value.trim();
  const confirm = document.getElementById('setupPasswordConfirm').value.trim();
  
  if (!password || password.length < 4) {
    showToast('Password must be at least 4 characters', 'error');
    return;
  }
  
  if (password !== confirm) {
    showToast('Passwords do not match', 'error');
    return;
  }
  
  try {
    await chrome.runtime.sendMessage({
      action: 'setPassword',
      password: password
    });
    
    hasPassword = true;
    showToast('Password set successfully!', 'success');
    
    setTimeout(() => {
      showSection('mainSection');
    }, 500);
  } catch (error) {
    showToast('Error setting password: ' + error.message, 'error');
  }
}

// Load current tab
async function loadCurrentTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  currentTab = tabs[0];
  
  if (currentTab) {
    document.getElementById('currentTabTitle').textContent = currentTab.title || 'Untitled';
    document.getElementById('currentTabUrl').textContent = new URL(currentTab.url).hostname;
    
    // Check if current tab is locked
    const response = await chrome.runtime.sendMessage({
      action: 'isLocked',
      tabId: currentTab.id
    });
    
    if (response.locked) {
      document.getElementById('lockCurrentBtn').style.display = 'none';
      document.getElementById('unlockCurrentBtn').style.display = 'inline-flex';
    } else {
      document.getElementById('lockCurrentBtn').style.display = 'inline-flex';
      document.getElementById('unlockCurrentBtn').style.display = 'none';
    }
  }
}

// Lock current tab
async function lockCurrentTab() {
  if (!isPro) {
    // Check free tier limit (3 tabs)
    const response = await chrome.runtime.sendMessage({ action: 'getLockedTabs' });
    const lockedCount = Object.keys(response.lockedTabs).length;
    
    if (lockedCount >= 3) {
      showToast('Free version limited to 3 locked tabs. Upgrade to Pro!', 'error');
      showUpgradeModal();
      return;
    }
  }
  
  try {
    await chrome.runtime.sendMessage({
      action: 'lockTab',
      tabId: currentTab.id,
      url: currentTab.url
    });
    
    showToast('Tab locked successfully!', 'success');
    await loadCurrentTab();
    await updateLockedTabsList();
  } catch (error) {
    showToast('Error locking tab: ' + error.message, 'error');
  }
}

// Unlock current tab
async function unlockCurrentTab() {
  try {
    await chrome.runtime.sendMessage({
      action: 'unlockTab',
      tabId: currentTab.id
    });
    
    showToast('Tab unlocked!', 'success');
    await loadCurrentTab();
    await updateLockedTabsList();
  } catch (error) {
    showToast('Error unlocking tab: ' + error.message, 'error');
  }
}

// Panic lock all tabs
async function panicLockAll() {
  if (!isPro) {
    showToast('Panic Lock is a Pro feature!', 'error');
    showUpgradeModal();
    return;
  }
  
  try {
    const response = await chrome.runtime.sendMessage({ action: 'lockAllTabs' });
    showToast(`Locked ${response.count} tabs!`, 'success');
    await updateLockedTabsList();
  } catch (error) {
    showToast('Error locking tabs: ' + error.message, 'error');
  }
}

// Unlock all tabs
async function unlockAllTabs() {
  if (confirm('Are you sure you want to unlock all tabs?')) {
    try {
      await chrome.runtime.sendMessage({ action: 'unlockAllTabs' });
      showToast('All tabs unlocked!', 'success');
      await updateLockedTabsList();
      await loadCurrentTab();
    } catch (error) {
      showToast('Error unlocking tabs: ' + error.message, 'error');
    }
  }
}

// Update locked tabs list
async function updateLockedTabsList() {
  const response = await chrome.runtime.sendMessage({ action: 'getLockedTabs' });
  lockedTabs = response.lockedTabs;
  
  const listContainer = document.getElementById('lockedTabsList');
  const count = Object.keys(lockedTabs).length;
  
  document.getElementById('lockedCount').textContent = count;
  
  if (count === 0) {
    listContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔒</div>
        <p>No locked tabs</p>
        <small>Lock tabs to keep them private and secure</small>
      </div>
    `;
    return;
  }
  
  listContainer.innerHTML = '';
  
  for (const [tabId, lockInfo] of Object.entries(lockedTabs)) {
    const item = document.createElement('div');
    item.className = 'locked-tab-item';
    
    const url = new URL(lockInfo.originalUrl);
    
    item.innerHTML = `
      <div class="tab-favicon">🌐</div>
      <div class="locked-tab-info">
        <div class="locked-tab-title">${url.hostname}</div>
        <div class="locked-tab-url">${lockInfo.originalUrl}</div>
      </div>
      <button class="unlock-btn-small" data-tab-id="${tabId}">Unlock</button>
    `;
    
    listContainer.appendChild(item);
  }
  
  // Add unlock button listeners
  document.querySelectorAll('.unlock-btn-small').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const tabId = parseInt(e.target.dataset.tabId);
      try {
        await chrome.runtime.sendMessage({
          action: 'unlockTab',
          tabId: tabId
        });
        showToast('Tab unlocked!', 'success');
        await updateLockedTabsList();
        await loadCurrentTab();
      } catch (error) {
        showToast('Error unlocking tab: ' + error.message, 'error');
      }
    });
  });
}

// Show section
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

// Update Pro UI
function updateProUI() {
  const proSettingsBtn = document.getElementById('proSettingsBtn');
  
  if (isPro) {
    document.getElementById('proBadge').style.display = 'block';
    document.getElementById('proFeaturesCard').style.display = 'none';
    
    // Show Pro Settings button in footer
    if (proSettingsBtn) {
      proSettingsBtn.style.display = 'inline-flex';
    }
    
    // Remove Pro overlay from settings
    const proSettingsCard = document.getElementById('proSettingsCard');
    if (proSettingsCard) {
      proSettingsCard.classList.remove('pro-only');
      const overlay = proSettingsCard.querySelector('.pro-overlay');
      if (overlay) {
        overlay.remove();
      }
    }
    
    document.getElementById('panicProLabel').style.display = 'none';
  } else {
    document.getElementById('proBadge').style.display = 'none';
    document.getElementById('proFeaturesCard').style.display = 'block';
    
    // Hide Pro Settings button in footer
    if (proSettingsBtn) {
      proSettingsBtn.style.display = 'none';
    }
    
    // Add Pro overlay to settings if not Pro
    const proSettingsCard = document.getElementById('proSettingsCard');
    if (proSettingsCard && !proSettingsCard.classList.contains('pro-only')) {
      proSettingsCard.classList.add('pro-only');
    }
    
    document.getElementById('panicProLabel').style.display = 'inline-block';
  }
}

// Load settings values
async function loadSettingsValues() {
  const settings = await chrome.storage.local.get([
    'biometricEnabled',
    'autoLockTime',
    'incognitoLock',
    'stealthMode',
    'sessionPersist'
  ]);
  
  document.getElementById('biometricToggle').checked = settings.biometricEnabled || false;
  document.getElementById('autoLockSelect').value = settings.autoLockTime || 0;
  document.getElementById('incognitoToggle').checked = settings.incognitoLock || false;
  document.getElementById('stealthToggle').checked = settings.stealthMode || false;
  document.getElementById('sessionToggle').checked = settings.sessionPersist || false;
}

// Toggle biometric
async function toggleBiometric(e) {
  const enabled = e.target.checked;
  
  if (enabled) {
    // Check if biometric is available
    if (window.PublicKeyCredential) {
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      
      if (!available) {
        showToast('Biometric authentication not available on this device', 'error');
        e.target.checked = false;
        return;
      }
    } else {
      showToast('Biometric authentication not supported', 'error');
      e.target.checked = false;
      return;
    }
  }
  
  await chrome.storage.local.set({ biometricEnabled: enabled });
  showToast(enabled ? 'Biometric enabled' : 'Biometric disabled', 'success');
}

// Update auto-lock
async function updateAutoLock(e) {
  if (!isPro && e.target.value !== '0') {
    showToast('Auto-lock is a Pro feature!', 'error');
    showUpgradeModal();
    e.target.value = '0';
    return;
  }
  
  const time = parseInt(e.target.value);
  await chrome.storage.local.set({ autoLockTime: time });
  showToast('Auto-lock settings updated', 'success');
}

// Toggle incognito
async function toggleIncognito(e) {
  if (!isPro && e.target.checked) {
    showToast('Incognito protection is a Pro feature!', 'error');
    showUpgradeModal();
    e.target.checked = false;
    return;
  }
  
  await chrome.storage.local.set({ incognitoLock: e.target.checked });
  showToast(e.target.checked ? 'Incognito protection enabled' : 'Incognito protection disabled', 'success');
}

// Toggle stealth
async function toggleStealth(e) {
  if (!isPro && e.target.checked) {
    showToast('Stealth mode is a Pro feature!', 'error');
    showUpgradeModal();
    e.target.checked = false;
    return;
  }
  
  await chrome.storage.local.set({ stealthMode: e.target.checked });
  showToast(e.target.checked ? 'Stealth mode enabled' : 'Stealth mode disabled', 'success');
}

// Toggle session persistence
async function toggleSession(e) {
  if (!isPro && e.target.checked) {
    showToast('Session persistence is a Pro feature!', 'error');
    showUpgradeModal();
    e.target.checked = false;
    return;
  }
  
  await chrome.storage.local.set({ sessionPersist: e.target.checked });
  showToast(e.target.checked ? 'Session persistence enabled' : 'Session persistence disabled', 'success');
}

// Change password
async function changePassword() {
  const newPassword = prompt('Enter new master password (min 4 characters):');
  
  if (!newPassword) return;
  
  if (newPassword.length < 4) {
    showToast('Password must be at least 4 characters', 'error');
    return;
  }
  
  const confirm = prompt('Confirm new password:');
  
  if (newPassword !== confirm) {
    showToast('Passwords do not match', 'error');
    return;
  }
  
  try {
    await chrome.runtime.sendMessage({
      action: 'setPassword',
      password: newPassword
    });
    
    showToast('Password changed successfully!', 'success');
  } catch (error) {
    showToast('Error changing password: ' + error.message, 'error');
  }
}

// Show upgrade modal
function showUpgradeModal() {
  document.getElementById('upgradeModal').style.display = 'flex';
}

// Close upgrade modal
function closeUpgradeModal() {
  document.getElementById('upgradeModal').style.display = 'none';
}

// Open payment link
function openPaymentLink() {
  // Your Gumroad product URL
  const paymentUrl = 'https://legendarycreation.gumroad.com/l/tab-lock-pro';
  
  // Open Gumroad checkout in new tab
  chrome.tabs.create({ url: paymentUrl }, () => {
    // Close upgrade modal
    closeUpgradeModal();
    
    // Show license activation modal after a moment
    setTimeout(() => {
      document.getElementById('licenseModal').style.display = 'flex';
      showToast('After purchase, enter your license key here', 'info');
    }, 1000);
  });
}

// Close license modal
function closeLicenseModal() {
  document.getElementById('licenseModal').style.display = 'none';
}

// Activate license
async function activateLicense() {
  const licenseKey = document.getElementById('licenseKeyInput').value.trim();
  
  if (!licenseKey) {
    showLicenseError('Please enter a license key');
    return;
  }
  
  try {
    const response = await chrome.runtime.sendMessage({
      action: 'activatePro',
      licenseKey: licenseKey
    });
    
    if (response.success) {
      isPro = true;
      showLicenseSuccess('Pro activated successfully! Reloading...');
      
      // Update icon to gold
      chrome.runtime.sendMessage({ action: 'updateIconGold' });
      
      setTimeout(() => {
        closeLicenseModal();
        updateProUI();
        loadSettingsValues();
        showToast('🎉 Pro features unlocked!', 'success');
      }, 1000);
    } else {
      showLicenseError(response.error || 'Invalid license key');
    }
  } catch (error) {
    showLicenseError('Error activating license: ' + error.message);
  }
}

// Show license error
function showLicenseError(message) {
  const errorDiv = document.getElementById('licenseError');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 3000);
}

// Show license success
function showLicenseSuccess(message) {
  const successDiv = document.getElementById('licenseSuccess');
  successDiv.textContent = message;
  successDiv.style.display = 'block';
}

// Show toast notification
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast show';
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Load domain list
async function loadDomainList() {
  const settings = await chrome.storage.local.get(['domainLocks']);
  const domains = settings.domainLocks || [];
  
  const domainList = document.getElementById('domainList');
  
  if (domains.length === 0) {
    domainList.innerHTML = '<div class="empty-domains">No domains configured</div>';
  } else {
    domainList.innerHTML = domains.map(domain => `
      <span class="domain-tag">
        ${domain}
        <span class="remove-domain" data-domain="${domain}">×</span>
      </span>
    `).join('');
    
    // Add remove listeners
    domainList.querySelectorAll('.remove-domain').forEach(btn => {
      btn.addEventListener('click', (e) => {
        removeDomain(e.target.dataset.domain);
      });
    });
  }
}

// Add domain
async function addDomain() {
  if (!isPro) {
    showToast('Domain auto-lock is a Pro feature!', 'error');
    showUpgradeModal();
    return;
  }
  
  const domain = prompt(
    'Enter a domain to auto-lock:\n\n' +
    'Examples:\n' +
    '  • bank.com\n' +
    '  • paypal.com\n' +
    '  • gmail.com\n' +
    '  • facebook.com\n\n' +
    'This site will automatically lock when you visit it.'
  );
  
  if (domain && domain.trim()) {
    const cleanDomain = domain.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
    
    const settings = await chrome.storage.local.get(['domainLocks']);
    const domains = settings.domainLocks || [];
    
    if (domains.includes(cleanDomain)) {
      showToast('Domain already exists!', 'error');
      return;
    }
    
    domains.push(cleanDomain);
    await chrome.storage.local.set({ domainLocks: domains });
    
    showToast(`✓ ${cleanDomain} will now auto-lock`, 'success');
    loadDomainList();
  }
}

// Remove domain
async function removeDomain(domain) {
  const settings = await chrome.storage.local.get(['domainLocks']);
  const domains = settings.domainLocks || [];
  
  const filtered = domains.filter(d => d !== domain);
  await chrome.storage.local.set({ domainLocks: filtered });
  
  showToast(`Removed ${domain}`, 'success');
  loadDomainList();
}

// Load schedule settings
async function loadScheduleSettings() {
  const settings = await chrome.storage.local.get(['timeBasedLocks']);
  const timeLocks = settings.timeBasedLocks || [];
  
  if (timeLocks.length > 0 && timeLocks[0].enabled) {
    document.getElementById('scheduleEnabledToggle').checked = true;
    document.getElementById('timePickerContainer').style.display = 'block';
    document.getElementById('startHourSelect').value = timeLocks[0].startHour;
    document.getElementById('endHourSelect').value = timeLocks[0].endHour;
    updateSchedulePreview();
  }
}

// Toggle schedule
function toggleSchedule(e) {
  if (!isPro) {
    e.target.checked = false;
    showToast('Scheduled locking is a Pro feature!', 'error');
    showUpgradeModal();
    return;
  }
  
  const enabled = e.target.checked;
  const container = document.getElementById('timePickerContainer');
  
  if (enabled) {
    container.style.display = 'block';
    updateSchedulePreview();
  } else {
    container.style.display = 'none';
    chrome.storage.local.set({ timeBasedLocks: [] });
    showToast('Scheduled locking disabled', 'success');
  }
}

// Update schedule preview
function updateSchedulePreview() {
  const startHour = parseInt(document.getElementById('startHourSelect').value);
  const endHour = parseInt(document.getElementById('endHourSelect').value);
  
  const formatHour = (hour) => {
    if (hour === 0) return '12:00 AM';
    if (hour === 12) return '12:00 PM';
    if (hour < 12) return `${hour}:00 AM`;
    return `${hour - 12}:00 PM`;
  };
  
  const preview = document.getElementById('schedulePreview');
  preview.textContent = `Tabs will auto-lock from ${formatHour(startHour)} to ${formatHour(endHour)}`;
}

// Save schedule
async function saveSchedule() {
  const startHour = parseInt(document.getElementById('startHourSelect').value);
  const endHour = parseInt(document.getElementById('endHourSelect').value);
  
  if (startHour === endHour) {
    showToast('Start and end times cannot be the same', 'error');
    return;
  }
  
  await chrome.storage.local.set({
    timeBasedLocks: [{
      enabled: true,
      startHour: startHour,
      endHour: endHour
    }]
  });
  
  const formatHour = (hour) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };
  
  showToast(`✓ Schedule saved: ${formatHour(startHour)} - ${formatHour(endHour)}`, 'success');
}

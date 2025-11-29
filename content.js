// Tab Lock Pro - Content Script
// Handles screenshot protection and other content-level features

(function() {
  'use strict';
  
  let isTabLocked = false;
  let screenshotProtectionEnabled = false;
  
  // Check if this tab is locked
  async function checkLockStatus() {
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'isLocked',
        tabId: await getCurrentTabId()
      });
      
      isTabLocked = response.locked;
      
      if (isTabLocked) {
        // Tab is locked, content script might need to handle additional features
        initLockedTabFeatures();
      }
    } catch (error) {
      console.error('Error checking lock status:', error);
    }
  }
  
  // Get current tab ID
  async function getCurrentTabId() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'getCurrentTabId' }, (response) => {
        resolve(response?.tabId);
      });
    });
  }
  
  // Initialize features for locked tabs
  function initLockedTabFeatures() {
    // Screenshot protection (Pro feature)
    initScreenshotProtection();
  }
  
  // Screenshot protection - blur content when taking screenshots
  function initScreenshotProtection() {
    // Check if Pro and screenshot protection is enabled
    chrome.storage.local.get(['isPro', 'screenshotProtection'], (result) => {
      if (result.isPro && result.screenshotProtection) {
        screenshotProtectionEnabled = true;
        enableScreenshotBlur();
      }
    });
  }
  
  // Enable screenshot blur protection
  function enableScreenshotBlur() {
    // Detect screenshot attempts (visibility change, focus change)
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    
    // Add blur overlay styles
    const style = document.createElement('style');
    style.id = 'tab-lock-pro-screenshot-protection';
    style.textContent = `
      .tab-lock-pro-blur-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .tab-lock-pro-blur-message {
        background: #fff;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
      
      .tab-lock-pro-blur-icon {
        font-size: 60px;
        margin-bottom: 20px;
      }
      
      .tab-lock-pro-blur-title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 10px;
        color: #333;
      }
      
      .tab-lock-pro-blur-text {
        font-size: 16px;
        color: #666;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Handle visibility change
  function handleVisibilityChange() {
    if (document.hidden && screenshotProtectionEnabled && isTabLocked) {
      // Page is hidden, might be taking screenshot
      // We can't actually detect screenshots, but we can blur on hide
      showBlurOverlay();
    } else {
      hideBlurOverlay();
    }
  }
  
  // Handle window blur
  function handleWindowBlur() {
    if (screenshotProtectionEnabled && isTabLocked) {
      // Window lost focus
      setTimeout(() => {
        if (!document.hasFocus()) {
          showBlurOverlay();
        }
      }, 100);
    }
  }
  
  // Show blur overlay
  function showBlurOverlay() {
    if (document.getElementById('tab-lock-pro-overlay')) return;
    
    const overlay = document.createElement('div');
    overlay.id = 'tab-lock-pro-overlay';
    overlay.className = 'tab-lock-pro-blur-overlay';
    overlay.innerHTML = `
      <div class="tab-lock-pro-blur-message">
        <div class="tab-lock-pro-blur-icon">🔒</div>
        <div class="tab-lock-pro-blur-title">Content Protected</div>
        <div class="tab-lock-pro-blur-text">This tab is locked and protected</div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Remove overlay when window regains focus
    window.addEventListener('focus', hideBlurOverlay);
  }
  
  // Hide blur overlay
  function hideBlurOverlay() {
    const overlay = document.getElementById('tab-lock-pro-overlay');
    if (overlay) {
      overlay.remove();
    }
  }
  
  // Listen for messages from background
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'tabLocked') {
      isTabLocked = true;
      initLockedTabFeatures();
    } else if (request.action === 'tabUnlocked') {
      isTabLocked = false;
      hideBlurOverlay();
    }
  });
  
  // Initialize
  checkLockStatus();
})();

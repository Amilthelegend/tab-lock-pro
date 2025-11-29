// Tab Lock Pro - Locked Page Script

let currentTabId = null;
let stealthMode = false;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  // Get tab ID and stealth mode from URL params
  const urlParams = new URLSearchParams(window.location.search);
  currentTabId = parseInt(urlParams.get('tab'));
  stealthMode = urlParams.get('stealth') === 'true';
  
  if (stealthMode) {
    document.body.classList.add('stealth');
  }
  
  // Check if biometric is available and enabled
  await checkBiometricAvailability();
  
  // Focus password input
  document.getElementById('passwordInput').focus();
  
  // Add enter key listener
  document.getElementById('passwordInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      unlockWithPassword();
    }
  });
  
  // Add button listeners
  document.getElementById('unlockBtn').addEventListener('click', unlockWithPassword);
  document.getElementById('biometricBtn').addEventListener('click', unlockWithBiometric);
});

// Check if biometric authentication is available
async function checkBiometricAvailability() {
  try {
    // Check if WebAuthn is available
    if (window.PublicKeyCredential) {
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      
      if (available) {
        // Check if biometric is enabled in settings
        chrome.storage.local.get(['biometricEnabled'], (result) => {
          if (result.biometricEnabled) {
            document.getElementById('biometricSection').style.display = 'block';
          }
        });
      }
    }
  } catch (error) {
    console.log('Biometric not available:', error);
  }
}

// Unlock with password
async function unlockWithPassword() {
  const password = document.getElementById('passwordInput').value.trim();
  
  if (!password) {
    showError('Please enter your password');
    return;
  }
  
  showLoading(true);
  
  try {
    // Verify password with background script
    const response = await chrome.runtime.sendMessage({
      action: 'verifyPassword',
      password: password
    });
    
    if (response.valid) {
      showSuccess('Unlocking tab...');
      
      // Unlock the tab
      await chrome.runtime.sendMessage({
        action: 'unlockTab',
        tabId: currentTabId
      });
    } else {
      showError('Incorrect password');
      document.getElementById('passwordInput').value = '';
      document.getElementById('passwordInput').focus();
    }
  } catch (error) {
    showError('Error unlocking tab: ' + error.message);
  } finally {
    showLoading(false);
  }
}

// Unlock with biometric
async function unlockWithBiometric() {
  showLoading(true);
  
  try {
    // Check if we have a stored credential
    const stored = await chrome.storage.local.get(['biometricCredential']);
    
    if (!stored.biometricCredential) {
      // First time - create credential
      await createBiometricCredential();
    } else {
      // Authenticate with existing credential
      await authenticateBiometric();
    }
  } catch (error) {
    showError('Biometric authentication failed: ' + error.message);
    showLoading(false);
  }
}

// Create biometric credential (first time setup)
async function createBiometricCredential() {
  try {
    const challenge = new Uint8Array(32);
    crypto.getRandomValues(challenge);
    
    const publicKeyOptions = {
      challenge: challenge,
      rp: {
        name: "Tab Lock Pro",
        id: window.location.hostname
      },
      user: {
        id: new Uint8Array(16),
        name: "user@tablockpro",
        displayName: "Tab Lock Pro User"
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },  // ES256
        { type: "public-key", alg: -257 } // RS256
      ],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required"
      },
      timeout: 60000,
      attestation: "none"
    };
    
    const credential = await navigator.credentials.create({
      publicKey: publicKeyOptions
    });
    
    if (credential) {
      // Store credential ID
      await chrome.storage.local.set({
        biometricCredential: {
          id: Array.from(new Uint8Array(credential.rawId)),
          created: Date.now()
        }
      });
      
      showSuccess('Biometric authentication successful! Unlocking...');
      
      // Unlock the tab
      await chrome.runtime.sendMessage({
        action: 'unlockTab',
        tabId: currentTabId
      });
    }
  } catch (error) {
    throw new Error('Failed to create biometric credential');
  } finally {
    showLoading(false);
  }
}

// Authenticate with biometric
async function authenticateBiometric() {
  try {
    const stored = await chrome.storage.local.get(['biometricCredential']);
    const credentialId = new Uint8Array(stored.biometricCredential.id);
    
    const challenge = new Uint8Array(32);
    crypto.getRandomValues(challenge);
    
    const publicKeyOptions = {
      challenge: challenge,
      allowCredentials: [{
        type: "public-key",
        id: credentialId
      }],
      userVerification: "required",
      timeout: 60000
    };
    
    const assertion = await navigator.credentials.get({
      publicKey: publicKeyOptions
    });
    
    if (assertion) {
      showSuccess('Authentication successful! Unlocking...');
      
      // Unlock the tab
      await chrome.runtime.sendMessage({
        action: 'unlockTab',
        tabId: currentTabId
      });
    }
  } catch (error) {
    throw new Error('Biometric authentication failed');
  } finally {
    showLoading(false);
  }
}

// Show error message
function showError(message) {
  const errorDiv = document.getElementById('errorMessage');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 3000);
}

// Show success message
function showSuccess(message) {
  const successDiv = document.getElementById('successMessage');
  successDiv.textContent = message;
  successDiv.style.display = 'block';
}

// Show/hide loading spinner
function showLoading(show) {
  const spinner = document.getElementById('loadingSpinner');
  if (show) {
    spinner.classList.add('active');
  } else {
    spinner.classList.remove('active');
  }
}

# Tab Lock Pro 🔒

**Secure your browser tabs with password and biometric protection**

Tab Lock Pro is a powerful Chrome extension that allows you to lock sensitive tabs with password protection and biometric authentication (Face ID/Fingerprint). Keep your private information safe from prying eyes!

## ✨ Features

### Free Version
- 🔐 Lock up to 3 tabs simultaneously
- 🔑 Password protection with SHA-256 encryption
- 👆 Biometric authentication support (Face ID, Windows Hello, Fingerprint)
- 🔓 Quick lock/unlock from popup
- 📊 Locked tabs overview

### Pro Version ($4.99 - One-time payment)
- ✅ **Unlimited tab locking** - Lock as many tabs as you need
- ⏰ **Auto-lock after inactivity** - Automatically lock tabs after 5, 10, 30, or 60 minutes
- 🕐 **Time-based auto-locking** - Auto-lock all tabs during work hours
- 🌐 **Domain-based auto-lock** - Automatically lock specific domains (banking, email, etc.)
- 🕵️ **Incognito tab protection** - Automatically lock all incognito tabs
- 👻 **Stealth mode** - Show generic placeholder instead of lock screen
- 🚨 **Panic button (Ctrl+Shift+L)** - Instantly lock all tabs with keyboard shortcut
- 🖼️ **Screenshot blur protection** - Blur content when screenshots might be taken
- 💾 **Session persistence** - Keep locks across browser restarts
- 🎯 **Priority support & updates**

## 🚀 Installation

### From Chrome Web Store
1. Visit the Chrome Web Store (link coming soon)
2. Click "Add to Chrome"
3. Follow the setup instructions

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the `tab-lock-pro` folder
6. The extension is now installed!

## 📖 How to Use

### Initial Setup
1. Click the Tab Lock Pro icon in your browser toolbar
2. Set up your master password (minimum 4 characters)
3. Confirm your password
4. You're ready to start locking tabs!

### Locking Tabs
1. Navigate to the tab you want to lock
2. Click the Tab Lock Pro icon
3. Click "🔒 Lock This Tab"
4. The tab is now protected!

### Unlocking Tabs
1. When you visit a locked tab, you'll see the lock screen
2. Enter your master password or use biometric authentication
3. Click "Unlock Tab"
4. The tab will be restored to its original content

### Quick Actions
- **Lock Current Tab**: Lock the tab you're currently viewing
- **Unlock All Tabs**: Unlock all locked tabs at once
- **Panic Lock All** (Pro): Instantly lock all open tabs with one click

### Pro Features Setup
1. Click "Upgrade to Pro" in the popup
2. Complete your purchase via Gumroad/Stripe
3. Enter your license key
4. All Pro features are now unlocked!

## 🔧 Settings

Access settings by clicking the ⚙️ Settings button in the popup.

### Security Settings
- **Master Password**: Change your master password anytime
- **Biometric Authentication**: Enable/disable Face ID or fingerprint unlock

### Pro Settings (Pro users only)
- **Auto-lock Inactive Tabs**: Choose timeout period (5-60 minutes)
- **Incognito Protection**: Automatically lock all incognito tabs
- **Stealth Mode**: Show generic placeholder instead of lock screen
- **Session Persistence**: Keep locks across browser restarts
- **Domain Auto-lock**: Configure which domains to automatically lock
- **Time-based Locking**: Set specific hours for automatic locking

## 🔐 Security

Tab Lock Pro takes your security seriously:

- **SHA-256 Password Hashing**: Your password is hashed using SHA-256 before storage
- **No Cloud Storage**: All data is stored locally on your device
- **WebAuthn Standard**: Biometric authentication uses the secure WebAuthn API
- **No Data Collection**: We don't collect or transmit any of your data

## 💡 Use Cases

- **Shared Computers**: Protect your tabs when using family or office computers
- **Public Spaces**: Lock sensitive tabs when working in coffee shops or libraries
- **Privacy**: Keep banking, email, and private accounts secure
- **Work-Life Balance**: Auto-lock work tabs after hours
- **Compliance**: Meet security requirements for sensitive information

## 🛠️ Technical Details

### Browser Compatibility
- Chrome 88+
- Edge 88+
- Brave 1.20+
- Any Chromium-based browser with Manifest V3 support

### Permissions Required
- `tabs`: To manage and lock tabs
- `storage`: To save locked tabs and settings
- `alarms`: For auto-lock timers (Pro)
- `activeTab`: To interact with current tab
- `<all_urls>`: To inject lock screens

### Technology Stack
- Manifest V3
- Vanilla JavaScript (no frameworks)
- Web Crypto API for password hashing
- WebAuthn API for biometric authentication
- Chrome Extension APIs

## 📝 Changelog

### Version 1.0.0 (Initial Release)
- ✨ Password-based tab locking
- 👆 Biometric authentication support
- 🎨 Beautiful modern UI
- 🚀 Pro version with advanced features
- 📱 Responsive design
- 🔒 Secure encryption

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea? Please open an issue on GitHub or contact us at support@tablockpro.com

## 📄 License

Copyright © 2025 Tab Lock Pro. All rights reserved.

## 🤝 Support

- Email: support@tablockpro.com
- Documentation: [Coming soon]
- FAQ: [Coming soon]

## 🎯 Privacy Policy

Tab Lock Pro respects your privacy:
- No data collection
- No analytics or tracking
- No third-party services
- All data stored locally
- Open source code (coming soon)

---

**Made with ❤️ for privacy-conscious users**

*Protect your tabs. Protect your privacy.*

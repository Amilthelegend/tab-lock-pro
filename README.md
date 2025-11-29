# 🔒 Tab Lock Pro

> Secure your browser tabs with password and biometric authentication

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-blue)](YOUR_CHROME_STORE_LINK)
[![Price](https://img.shields.io/badge/Price-$4.99-gold)](https://legendarycreation.gumroad.com/l/tab-lock-pro)
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

## ✨ Features

### Free Version
- 🔐 Lock up to 3 tabs
- 🔑 Password protection with SHA-256 encryption
- 👆 Biometric authentication (Face ID, Touch ID, Windows Hello)
- 🛡️ 100% private - all data stays on your device

### Pro Version ($4.99 one-time)
- ♾️ **Unlimited tab locking**
- ⏰ **Auto-lock timers** (5, 10, 30, 60 minutes)
- 🚨 **Panic button** (Ctrl+Shift+L locks all tabs instantly)
- 🌐 **Domain auto-lock** (automatically lock banking sites, email, etc.)
- 🕐 **Scheduled locking** (auto-lock during work hours)
- 🕵️ **Incognito protection** (auto-lock private tabs)
- 👻 **Stealth mode** (show generic placeholder)
- 💾 **Session persistence** (locks survive browser restart)
- 🔕 **Screenshot protection** (blur locked tabs)

## 🚀 Installation

### From Chrome Web Store (Recommended)
1. Visit [Tab Lock Pro on Chrome Web Store](YOUR_CHROME_STORE_LINK)
2. Click "Add to Chrome"
3. Set your master password
4. Start locking tabs!

### Manual Installation (Development)
1. Clone this repository
   ```bash
   git clone https://github.com/Amilthelegend/tab-lock-pro.git
   cd tab-lock-pro
   ```

2. Load in Chrome
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `tab-lock-pro` folder

3. Set your master password and start using!

## 🎯 Use Cases

- 👨‍👩‍👧‍👦 **Shared family computers** - Keep your tabs private
- 💼 **Office workstations** - Protect sensitive work information
- 🏫 **Public computers** - Lock your tabs at libraries, cafes
- 🏠 **Remote work** - Prevent unauthorized access during breaks
- 🔒 **Privacy enthusiasts** - Extra layer of security

## 🛡️ Security

- **SHA-256 encryption** for password hashing
- **WebAuthn standard** for biometric authentication
- **Local storage only** - no cloud, no tracking
- **Zero data collection** - 100% private
- **Open for security audit** - check the code yourself

## 💎 Upgrade to Pro

Get lifetime access to all Pro features for a one-time payment of **$4.99**

👉 [Upgrade Now](https://legendarycreation.gumroad.com/l/tab-lock-pro)

### What You Get:
- ✅ Unlimited tab locking (vs 3 in free)
- ✅ All Pro features unlocked
- ✅ Lifetime updates
- ✅ Priority support
- ✅ No subscriptions ever

## 📖 How to Use

### Basic Usage
1. Click the Tab Lock Pro icon
2. Click "Lock This Tab" on any tab
3. Tab is now password-protected
4. Visit the tab → Enter password to unlock

### Pro Features

**Auto-lock Timer:**
- Settings → Auto-lock Inactive Tabs
- Choose: 5, 10, 30, or 60 minutes
- Tabs lock automatically after inactivity

**Panic Button:**
- Press `Ctrl+Shift+L` (or `Cmd+Shift+L` on Mac)
- All tabs lock instantly
- Perfect for emergencies

**Domain Auto-lock:**
- Settings → Pro Settings → Domain Auto-lock
- Add domains: `bank.com`, `gmail.com`, etc.
- These sites auto-lock when visited

**Scheduled Locking:**
- Settings → Pro Settings → Scheduled Auto-lock
- Set hours: e.g., 9 AM - 5 PM
- All tabs auto-lock during those hours

## 🎨 Screenshots

![Main Interface](screenshots/main.png)
![Lock Screen](screenshots/locked.png)
![Pro Settings](screenshots/pro-settings.png)

## 🛠️ Tech Stack

- Manifest V3
- Vanilla JavaScript (no frameworks)
- Chrome Extension APIs
- WebAuthn for biometrics
- Web Crypto API for encryption

## 📝 Development

### Project Structure
```
tab-lock-pro/
├── manifest.json          # Extension manifest
├── background.js          # Service worker
├── popup.html/js         # Extension popup
├── locked.html/js        # Lock screen
├── content.js            # Content script
├── styles/               # CSS files
├── icons/                # Extension icons
└── docs/                 # Documentation
```

### Building
```bash
# Create production build
chmod +x build.sh
./build.sh
```

This creates `tab-lock-pro-v1.0.0.zip` ready for Chrome Web Store submission.

## 🤝 Support

- 📧 Email: eftekaramil@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/YOUR_USERNAME/tab-lock-pro/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/YOUR_USERNAME/tab-lock-pro/discussions)

## 📄 License

This is proprietary software. The source code is available for review and security auditing, but not for redistribution or commercial use.

## 🙏 Credits

Made with ❤️ by [Eftekar amil]

## ⭐ Show Your Support

If you find Tab Lock Pro useful, please:
- ⭐ Star this repository
- ✍️ Leave a review on Chrome Web Store
- 🐦 Share on social media
- 💰 [Upgrade to Pro](https://legendarycreation.gumroad.com/l/tab-lock-pro)

---

**Privacy Policy** | **Terms of Service** | **Support**

# Quick Start Guide

**Get Tab Lock Pro running in 5 minutes!**

## Step 1: Test Locally (2 minutes)

1. Open Chrome browser
2. Type `chrome://extensions/` in address bar
3. Toggle on "Developer mode" (top right)
4. Click "Load unpacked"
5. Navigate to and select the `tab-lock-pro` folder
6. ✅ Extension installed!

## Step 2: First Test (2 minutes)

1. Click the Tab Lock Pro icon in your toolbar
2. Set a master password (try "test1234")
3. Confirm the password
4. Open any website (e.g., google.com)
5. Click Tab Lock Pro icon → "Lock This Tab"
6. Visit the tab → See the lock screen!
7. Enter your password → Tab unlocks!

## Step 3: Test Pro Features (1 minute)

1. Click Tab Lock Pro icon → Settings
2. Try entering any license key (10+ characters)
3. All Pro features unlock!
4. Test auto-lock, stealth mode, etc.

---

## What to Do Next

### Immediate (Today)
- [ ] Test all features from TESTING_GUIDE.md
- [ ] Customize branding (optional)
- [ ] Set up Gumroad account

### This Week
- [ ] Create 5 screenshots (1280x800px)
- [ ] Write privacy policy
- [ ] Set up payment integration
- [ ] Test payment flow

### Next Week
- [ ] Create promotional materials
- [ ] Submit to Chrome Web Store
- [ ] Plan marketing strategy

---

## Payment Setup (Choose One)

### Option A: Gumroad (Easiest) ⭐
```
1. Go to gumroad.com → Sign up
2. Create product: "Tab Lock Pro" - $4.99
3. Enable "License Keys"
4. Copy product URL
5. Update popup.js line 450 with your URL
6. Test purchase flow
7. Done!
```

### Option B: Stripe (Lower Fees)
```
See INTEGRATION_GUIDE.md for full setup
(Requires backend server)
```

---

## Common First-Time Issues

**Extension won't load?**
- Make sure you selected the correct folder
- Check for manifest.json in the folder
- Look for errors in chrome://extensions/

**Can't unlock tab?**
- Check password is correct
- Try clicking "Forgot password" and resetting

**Biometric not working?**
- Requires compatible device (Mac Touch ID, Windows Hello)
- Enable in Settings first

**Pro features not working?**
- Enter a license key (any 10+ chars for testing)
- Check "isPro" is true in extension storage

---

## File Checklist

Before submitting, you need:
- [x] Extension code (all .js, .html, .css files)
- [x] Icons (16, 32, 48, 128 sizes)
- [x] Documentation (README, guides)
- [ ] Screenshots (5 images, 1280x800)
- [ ] Promotional image (440x280)
- [ ] Privacy policy URL
- [ ] Support email
- [ ] Payment link (Gumroad/Stripe)

---

## Quick Commands

```bash
# Test the extension
Open chrome://extensions/ → Load unpacked

# Build for submission
./build.sh

# Check files
ls -la

# Verify package
unzip -l tab-lock-pro-v1.0.0.zip
```

---

## Need Help?

1. **Testing Issues** → Read TESTING_GUIDE.md
2. **Payment Setup** → Read INTEGRATION_GUIDE.md
3. **Store Submission** → Read CHROME_WEB_STORE.md
4. **Technical Questions** → Check Chrome docs

---

## Success Checklist

- [x] ✅ Extension built
- [ ] ⏳ Tested locally
- [ ] ⏳ Payment integrated
- [ ] ⏳ Screenshots created
- [ ] ⏳ Store listing written
- [ ] ⏳ Submitted to Chrome Web Store
- [ ] ⏳ Approved & live
- [ ] ⏳ First sale!

---

**You're all set! Start testing now! 🚀**

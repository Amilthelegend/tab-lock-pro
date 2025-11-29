# Gumroad Setup Guide - Tab Lock Pro

## 🎯 Complete Gumroad Integration Checklist

### Step 1: Create Gumroad Account (5 minutes)

1. Go to https://gumroad.com/signup
2. Sign up with your email
3. Complete profile setup
4. Add payout details (bank account or PayPal)

---

### Step 2: Create Your Product (10 minutes)

**Click "Products" → "New Product"**

#### Basic Info:

**Name:**
```
Tab Lock Pro - Lifetime License
```

**URL/Permalink:**
```
tab-lock-pro
```
(Your product will be at: `https://yourusername.gumroad.com/l/tab-lock-pro`)

**Price:**
```
$4.99
```

**Summary (short description):**
```
Unlock unlimited tab locking, auto-lock, stealth mode, panic button & more. One-time payment, lifetime access!
```

---

#### Product Description (copy/paste):

```
🔒 Tab Lock Pro - Lifetime License

Unlock all Pro features with a one-time payment. No subscriptions, no recurring fees - pay once, use forever!

✨ INCLUDED PRO FEATURES:

✓ Unlimited Tab Locking (Free version: 3 tabs only)
✓ Auto-lock After Inactivity (5, 10, 30, or 60 minutes)
✓ Time-based Auto-locking (schedule specific hours)
✓ Domain-based Auto-lock (auto-lock banking sites, email, etc.)
✓ Incognito Tab Protection (auto-lock private browsing)
✓ Stealth Mode (show generic placeholder instead of lock screen)
✓ Panic Button (Ctrl+Shift+L - lock all tabs instantly)
✓ Screenshot Blur Protection (protect content from screenshots)
✓ Session Persistence (keep locks across browser restarts)
✓ Priority Support
✓ Lifetime Updates

🎯 HOW IT WORKS:

1. Purchase this license
2. Receive unique license key via email (instant delivery)
3. Install Tab Lock Pro from Chrome Web Store
4. Click extension → Settings → Upgrade to Pro
5. Enter your license key
6. All Pro features unlock immediately!

💳 ONE-TIME PAYMENT

$4.99 - Pay once, use forever. All future updates included.

🔐 SECURITY & PRIVACY

• Unique license key per customer
• All data stored locally on your device
• No cloud storage, no tracking
• Fully secure password & biometric authentication

⚡ INSTANT DELIVERY

Your license key is sent to your email immediately after purchase.

📧 NEED HELP?

Email: support@youremail.com (replace with your actual email)
Response time: Within 24 hours

---

SYSTEM REQUIREMENTS:
• Chrome 88+ / Edge 88+ / Brave 1.20+
• Desktop only (not available on mobile browsers)
• Windows, Mac, or Linux

---

PERFECT FOR:
• Shared family computers
• Office workstations
• Public computers
• Privacy-conscious users
• Remote workers
• Anyone who values tab security

By purchasing, you agree to our Terms of Service and Privacy Policy.
```

---

#### Product Settings:

**Product Type:**
- Select: `Digital Product`

**Content:**
- Select: `I'll email the content to buyer`
- OR upload a PDF with license key instructions (optional)

**Customize Thank You:**
```
🎉 Thank you for purchasing Tab Lock Pro!

Your license key has been sent to your email.

NEXT STEPS:
1. Check your email for the license key
2. Install Tab Lock Pro from Chrome Web Store
3. Click extension icon → Settings → Upgrade to Pro
4. Enter your license key
5. Enjoy all Pro features!

Need help? Email support@youremail.com
```

**Enable License Keys:** ✅ **YES - VERY IMPORTANT!**
- Toggle this ON
- Gumroad will auto-generate unique keys
- Keys sent automatically to customers

**File Downloads:**
- Optional: Upload a PDF with instructions
- Or leave empty (license key is enough)

---

### Step 3: Customize Email (Important!)

Gumroad sends an automatic email. Customize it:

**Subject:**
```
Your Tab Lock Pro License Key 🔒
```

**Email Body:**
```
Hi there! 👋

Thank you for purchasing Tab Lock Pro!

🔑 YOUR LICENSE KEY:
{license_key}

📥 INSTALLATION STEPS:

1. Install Tab Lock Pro from Chrome Web Store:
   [You'll add this link after Chrome Web Store approval]

2. Open Chrome and click the Tab Lock Pro icon

3. Click the Settings ⚙️ button

4. Click "Upgrade to Pro"

5. Enter your license key (shown above)

6. Click "Activate License"

7. All Pro features are now unlocked! ✨

💡 PRO FEATURES YOU NOW HAVE:

• Unlimited tab locking
• Auto-lock timers
• Panic button (Ctrl+Shift+L)
• Stealth mode
• And much more!

📧 NEED HELP?

Just reply to this email and I'll assist you personally.
Response time: Within 24 hours.

🎯 TIPS FOR BEST EXPERIENCE:

• Set up auto-lock timers for extra security
• Try the panic button (Ctrl+Shift+L)
• Enable stealth mode for discretion
• Configure domain auto-locks for banking sites

Thanks for supporting Tab Lock Pro!

Best regards,
[Your Name]
Tab Lock Pro Team

P.S. If you love the extension, please leave us a review on the Chrome Web Store! It helps other users find us. ⭐
```

---

### Step 4: Set Up Workflows (Optional but Recommended)

**Gumroad Workflows** can automate actions:

1. **On Purchase → Send Welcome Email**
   - Already done with the email above

2. **On Refund → Deactivate License**
   - Set up if you want to track refunds

3. **Add to Email List**
   - Build your customer email list
   - Send updates about new features

---

### Step 5: Test Your Product

**BEFORE going live:**

1. Click "Preview" on your product
2. Check all details are correct
3. Do a test purchase (you can refund yourself)
4. Verify you receive the license key
5. Test the license key in the extension

---

### Step 6: Get Your Product Links

After publishing, you'll have:

**Standard Link:**
```
https://[yourusername].gumroad.com/l/tab-lock-pro
```

**Short Link (better for marketing):**
```
https://gumroad.com/l/tab-lock-pro
```

**Copy this link** - you'll need it for the extension!

---

### Step 7: Update the Extension Code

**Open:** `popup.js` (line ~450)

**Find:**
```javascript
const paymentUrl = 'YOUR_GUMROAD_PRODUCT_URL_HERE';
```

**Replace with:**
```javascript
const paymentUrl = 'https://yourusername.gumroad.com/l/tab-lock-pro';
```
(Use your actual Gumroad link)

**Save the file**

---

### Step 8: Rebuild Extension

```bash
# Navigate to extension folder
cd tab-lock-pro

# Run build script
./build.sh

# This creates: tab-lock-pro-v1.0.0.zip
# Upload this to Chrome Web Store
```

---

## 📧 Email Addresses to Set Up

**Support Email:**
```
support@youremail.com
```

**Create this email or use:**
- Your personal email
- Gmail account
- Professional domain email

**Update support email in:**
1. Gumroad product description
2. Extension README.md
3. Chrome Web Store listing
4. Extension popup.js (settings page)

---

## 💰 Gumroad Fees

**Gumroad takes:**
- 10% + $0.30 per transaction

**Your earnings per sale:**
- $4.99 sale → You get ~$4.19
- Very simple, no monthly fees
- They handle VAT/taxes automatically

---

## 📊 Marketing Your Product

**Gumroad provides:**
- Sales dashboard
- Customer management
- Discount codes
- Email list
- Analytics

**You can create:**
- Discount codes (e.g., LAUNCH50 for 50% off)
- Limited-time offers
- Bundle deals

---

## 🔐 License Key Management

**Gumroad Auto-generates Keys:**
- Format: `XXXX-XXXX-XXXX-XXXX`
- Each key is unique
- Sent automatically on purchase
- You can view all keys in dashboard

**Manual Verification (Optional):**
- For extra security, use Gumroad API
- Code is in background.js (commented out)
- Requires backend server
- Most extensions don't need this

---

## ✅ Final Checklist Before Launch

- [ ] Gumroad account created
- [ ] Product listed at $4.99
- [ ] License keys enabled
- [ ] Email customized
- [ ] Test purchase completed
- [ ] Extension updated with Gumroad link
- [ ] Support email set up
- [ ] Privacy policy published
- [ ] Chrome Web Store listing ready

---

## 🚀 Launch Day Tips

1. **Set an introductory price:**
   - Launch at $3.99 for first 100 customers
   - Then raise to $4.99

2. **Create discount code:**
   - Code: LAUNCH30
   - 30% off for early adopters

3. **Promote on:**
   - Product Hunt
   - Reddit (r/chrome, r/productivity)
   - Twitter/X
   - Your social media

4. **Track everything:**
   - Gumroad analytics
   - Chrome Web Store stats
   - Customer feedback

---

## 🆘 Common Issues & Solutions

**Issue: License key not working**
- Check key is copied correctly (no spaces)
- Verify extension is latest version
- Check internet connection

**Issue: Customer didn't receive email**
- Check spam folder
- Resend from Gumroad dashboard
- Contact customer directly

**Issue: Refund request**
- Gumroad handles refunds
- You can approve/deny
- Full refund = $0 fee from Gumroad

---

## 📞 Support Resources

**Gumroad Help:**
- https://help.gumroad.com
- Live chat support
- Email: support@gumroad.com

**Your Customers:**
- Reply to emails within 24 hours
- Be helpful and friendly
- Fix bugs quickly
- Consider feedback for updates

---

## 🎯 Next Steps

1. ✅ Create Gumroad account NOW
2. ✅ Set up product (10 minutes)
3. ✅ Do test purchase
4. ✅ Update extension with link
5. ✅ Submit to Chrome Web Store
6. ✅ Launch and promote!

---

**Good luck with your launch! 🚀**

You're creating a quality product with a fair price. Focus on great customer support and the sales will come!

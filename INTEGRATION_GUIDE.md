# Payment Integration Guide

This guide explains how to integrate Gumroad or Stripe payment processing for the Tab Lock Pro extension.

## Option 1: Gumroad Integration (Recommended for simplicity)

### Setup Steps

1. **Create Gumroad Product**
   - Go to https://gumroad.com
   - Create a new product: "Tab Lock Pro - Lifetime License"
   - Set price: $4.99
   - Enable "Generate license keys"

2. **Update Extension Code**

In `popup.js`, update the `openPaymentLink()` function:

```javascript
function openPaymentLink() {
  const paymentUrl = 'https://your-username.gumroad.com/l/tab-lock-pro';
  chrome.tabs.create({ url: paymentUrl });
}
```

3. **Verify License Keys**

In `background.js`, update the `verifyLicenseKey()` function:

```javascript
async function verifyLicenseKey(key) {
  try {
    const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_permalink: 'tab-lock-pro', // Your product permalink
        license_key: key,
        increment_uses_count: false
      })
    });
    
    const data = await response.json();
    return data.success && data.purchase;
  } catch (error) {
    console.error('License verification error:', error);
    return false;
  }
}
```

4. **Configure Gumroad Settings**
   - Go to your product settings
   - Enable "License Keys"
   - Set redirect URL after purchase (optional)
   - Add custom fields if needed

### Testing
- Use Gumroad's test mode to verify the flow
- Test with a real purchase (you can refund it)
- Verify license key activation works

---

## Option 2: Stripe Integration

### Setup Steps

1. **Create Stripe Account**
   - Go to https://stripe.com
   - Complete account setup
   - Get your API keys (test and live)

2. **Create Product and Price**
   - Create product: "Tab Lock Pro"
   - Create price: $4.99 one-time payment
   - Note the price ID

3. **Set Up Backend (Required for Stripe)**

You'll need a simple backend to handle Stripe webhooks. Example using Node.js:

```javascript
// server.js
const express = require('express');
const stripe = require('stripe')('sk_your_secret_key');
const app = express();

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: 'price_your_price_id',
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://yourdomain.com/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://yourdomain.com/cancel',
  });
  
  res.json({ id: session.id });
});

app.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      'whsec_your_webhook_secret'
    );
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Generate and store license key
      const licenseKey = generateLicenseKey();
      
      // Send license key to customer email
      await sendLicenseEmail(session.customer_email, licenseKey);
    }
    
    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
```

4. **Update Extension Code**

In `popup.js`:

```javascript
function openPaymentLink() {
  // Create checkout session via your backend
  fetch('https://your-backend.com/create-checkout-session', {
    method: 'POST',
  })
  .then(res => res.json())
  .then(data => {
    // Redirect to Stripe Checkout
    const stripe = Stripe('pk_your_publishable_key');
    return stripe.redirectToCheckout({ sessionId: data.id });
  });
}
```

---

## Option 3: Simple License Key System (No Payment Processing)

If you want to handle payments manually and just need license validation:

1. **Generate License Keys**

Create a simple key generator:

```javascript
function generateLicenseKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = 4;
  const segmentLength = 4;
  
  let key = [];
  for (let i = 0; i < segments; i++) {
    let segment = '';
    for (let j = 0; j < segmentLength; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    key.push(segment);
  }
  
  return key.join('-');
}
```

2. **Store Valid Keys**

Keep a list of valid license keys in a database or simple file:

```javascript
const validKeys = [
  'ABCD-EFGH-IJKL-MNOP',
  'QRST-UVWX-YZ12-3456',
  // Add keys as you sell them
];

async function verifyLicenseKey(key) {
  return validKeys.includes(key);
}
```

3. **Manual Distribution**
   - Accept payment via PayPal, Venmo, etc.
   - Generate license key
   - Email key to customer

---

## Recommended Approach

**For Your First Launch:** Use Gumroad
- Easiest to set up
- No backend required
- Built-in license key system
- Handles VAT/taxes automatically
- Takes care of payment processing

**For Scale:** Migrate to Stripe
- Lower fees (2.9% + 30¢ vs Gumroad's 10%)
- More control
- Better analytics
- Custom checkout experience

---

## Security Best Practices

1. **Never store API keys in extension code**
   - Use a backend server for sensitive operations
   - Extension code is visible to users

2. **Validate license keys server-side**
   - Don't rely only on client-side validation
   - Users can modify extension code

3. **Rate limit verification requests**
   - Prevent abuse of your verification endpoint
   - Use caching for repeated checks

4. **Implement key activation limits**
   - Limit how many times a key can be activated
   - Track installations per key

---

## Testing Checklist

Before launch:
- [ ] Test purchase flow end-to-end
- [ ] Verify license key activation works
- [ ] Test with invalid keys
- [ ] Test network errors
- [ ] Verify all Pro features unlock
- [ ] Test refund scenario
- [ ] Check mobile payment flow
- [ ] Verify email delivery of keys

---

## After Integration

Update these files:
1. `popup.js` - Payment link
2. `background.js` - License verification
3. `README.md` - Purchase instructions
4. Privacy policy - Add payment processor info

---

## Support Resources

- **Gumroad**: https://help.gumroad.com
- **Stripe**: https://stripe.com/docs
- **Chrome Web Store**: https://developer.chrome.com/docs/webstore

---

## Next Steps

1. Choose your payment method (Gumroad recommended)
2. Create your product listing
3. Update the extension code with your payment link
4. Test the complete purchase flow
5. Submit to Chrome Web Store
6. Launch! 🚀

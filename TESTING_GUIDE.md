# Testing Guide for Tab Lock Pro

Complete testing checklist to ensure everything works before submission.

## 🚀 Quick Start Testing

1. **Load Extension**
   ```
   1. Open Chrome
   2. Go to chrome://extensions/
   3. Enable "Developer mode" (top right)
   4. Click "Load unpacked"
   5. Select the tab-lock-pro folder
   ```

2. **First Run Setup**
   - Click extension icon
   - Should show setup screen
   - Set password (min 4 characters)
   - Confirm password
   - Should redirect to main screen

---

## ✅ Core Features Testing

### Password Setup
- [ ] Can set password (4+ characters)
- [ ] Shows error if passwords don't match
- [ ] Shows error if password too short
- [ ] Password is required before using extension
- [ ] Can change password in settings

### Locking Tabs
- [ ] Can lock current tab
- [ ] Tab shows lock screen when locked
- [ ] Lock screen is visually appealing
- [ ] Badge shows count of locked tabs
- [ ] Can see locked tabs in popup list

### Unlocking Tabs
- [ ] Can unlock with correct password
- [ ] Shows error with wrong password
- [ ] Tab restores to original content
- [ ] Unlock removes from locked list
- [ ] Can unlock from popup list

### Free Tier Limits
- [ ] Can lock up to 3 tabs
- [ ] Shows upgrade prompt when trying to lock 4th tab
- [ ] Free tier limits enforced

---

## 🔐 Biometric Testing

**Note: Requires compatible device (Mac with Touch ID, Windows Hello, etc.)**

### Setup
- [ ] Biometric toggle appears in settings
- [ ] Can enable biometric in settings
- [ ] Shows error if device doesn't support biometric

### Usage
- [ ] Biometric option appears on lock screen
- [ ] Can unlock with Face ID/Touch ID
- [ ] Falls back to password if biometric fails
- [ ] Works on multiple locked tabs

---

## 💎 Pro Features Testing

### Activation
- [ ] Can open upgrade modal
- [ ] Can open license activation
- [ ] Can enter license key
- [ ] Shows error for invalid key
- [ ] Pro badge appears when activated
- [ ] Pro settings become available

### Unlimited Locking
- [ ] Can lock more than 3 tabs
- [ ] No limit on number of locked tabs
- [ ] All tabs work correctly

### Auto-lock Inactive Tabs
- [ ] Can select timeout in settings
- [ ] Tabs lock after inactivity period
- [ ] Manual activity resets timer
- [ ] Works with multiple tabs

### Incognito Protection
- [ ] Can enable in settings
- [ ] New incognito tabs auto-lock
- [ ] Can unlock incognito tabs
- [ ] Works correctly

### Stealth Mode
- [ ] Can enable in settings
- [ ] Locked tabs show generic placeholder
- [ ] Still require password to unlock
- [ ] Original content restored after unlock

### Panic Button
- [ ] Ctrl+Shift+L locks all tabs (or Cmd+Shift+L on Mac)
- [ ] All unlocked tabs become locked
- [ ] Shows success notification
- [ ] Already locked tabs stay locked

---

## 🔍 Edge Cases Testing

### Browser Restart
- [ ] Locked tabs persist after restart (if session persistence enabled)
- [ ] Can unlock tabs after restart
- [ ] Settings are preserved
- [ ] Pro status is preserved

### Tab Refresh
- [ ] Locked tab stays locked on refresh
- [ ] Lock screen re-appears
- [ ] Can still unlock

### Multiple Windows
- [ ] Works across multiple windows
- [ ] Locked count is accurate
- [ ] Can lock tabs in different windows

### Special URLs
- [ ] Test with chrome:// URLs (should handle gracefully)
- [ ] Test with file:// URLs
- [ ] Test with extension:// URLs
- [ ] Test with data: URLs

### Navigation
- [ ] Locked tab stays locked when navigating
- [ ] Lock screen appears on new navigation
- [ ] Original URL is preserved

---

## 🐛 Error Handling

### Network Issues
- [ ] Works offline (no network required)
- [ ] License verification handles no connection
- [ ] No errors in console

### Storage Limits
- [ ] Handles many locked tabs (50+)
- [ ] Handles long URLs
- [ ] Handles special characters in URLs

### Invalid States
- [ ] Handles deleted tabs gracefully
- [ ] Handles tab crashes
- [ ] Handles extension updates

---

## 🎨 UI/UX Testing

### Popup Interface
- [ ] All buttons work
- [ ] Scrolling works with many locked tabs
- [ ] Text is readable
- [ ] Icons display correctly
- [ ] Responsive to window resize

### Lock Screen
- [ ] Visually appealing
- [ ] Password input works
- [ ] Buttons are clickable
- [ ] Error messages display correctly
- [ ] Loading states show

### Settings Screen
- [ ] All toggles work
- [ ] Dropdowns work
- [ ] Navigation works
- [ ] Back button works
- [ ] Changes save correctly

---

## 🔒 Security Testing

### Password Security
- [ ] Password is hashed (check storage)
- [ ] Can't see password in storage
- [ ] Can't bypass lock screen
- [ ] Can't access content without unlock

### Data Privacy
- [ ] No external network calls (except license verification)
- [ ] No tracking
- [ ] No analytics
- [ ] All data stored locally

---

## 📱 Cross-Browser Testing

### Chrome
- [ ] Works on latest Chrome
- [ ] Works on Chrome 88+

### Edge
- [ ] Works on latest Edge
- [ ] Compatible with Edge specific features

### Brave
- [ ] Works on Brave
- [ ] No conflicts with Brave shields

---

## 🚨 Performance Testing

### Memory Usage
- [ ] Check memory with many locked tabs
- [ ] No memory leaks
- [ ] Reasonable resource usage

### Speed
- [ ] Lock/unlock is fast
- [ ] Popup opens quickly
- [ ] No lag in UI

---

## 📊 Console Testing

Check browser console for:
- [ ] No errors
- [ ] No warnings
- [ ] No unnecessary logs in production
- [ ] Clean console output

---

## ✉️ User Flow Testing

### New User
1. [ ] Install extension
2. [ ] See setup screen
3. [ ] Set password
4. [ ] Lock first tab
5. [ ] Unlock tab
6. [ ] Explore settings

### Existing User
1. [ ] Open extension
2. [ ] Lock multiple tabs
3. [ ] Manage locked tabs
4. [ ] Change settings
5. [ ] Upgrade to Pro

### Pro User
1. [ ] Activate license
2. [ ] Use Pro features
3. [ ] Configure advanced settings
4. [ ] Use panic button

---

## 🎯 Final Checks Before Submission

- [ ] All features work as expected
- [ ] No console errors
- [ ] All text is correct (no typos)
- [ ] Icons display correctly
- [ ] Privacy policy is accessible
- [ ] README is up to date
- [ ] Version number is correct
- [ ] All files are included
- [ ] No debug code left
- [ ] No test data in storage

---

## 🐛 Bug Report Template

If you find bugs, document them like this:

```
**Bug Title**: [Short description]

**Steps to Reproduce**:
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior**:
[What should happen]

**Actual Behavior**:
[What actually happened]

**Browser**: Chrome [version]
**OS**: [Windows/Mac/Linux]
**Extension Version**: 1.0.0

**Console Errors**:
[Paste any console errors]

**Screenshots**:
[Attach if relevant]
```

---

## 📝 Testing Notes

Keep track of:
- Date tested
- Version tested
- Issues found
- Issues resolved
- Tester name

---

## ✅ Sign-off Checklist

Before submitting to Chrome Web Store:

- [ ] All tests passed
- [ ] No critical bugs
- [ ] UI/UX polished
- [ ] Documentation complete
- [ ] Payment integration tested
- [ ] Privacy policy published
- [ ] Support email set up
- [ ] Marketing materials ready
- [ ] Screenshots created
- [ ] Store listing written

---

**Testing is crucial! Don't skip steps.**

Good luck! 🚀

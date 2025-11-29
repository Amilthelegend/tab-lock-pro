# 🚀 GitHub Deployment Guide

## 📋 Prerequisites

1. GitHub account
2. Git installed on your computer
3. Tab Lock Pro files ready

---

## 🎯 Quick Deployment (5 minutes)

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `tab-lock-pro`
3. Description: `Secure your browser tabs with password and biometric authentication`
4. **Keep it PUBLIC** (so users can audit security)
5. ✅ Add a README file: **NO** (we have our own)
6. ✅ Add .gitignore: **NO** (we have our own)
7. Click **"Create repository"**

### Step 2: Prepare Your Files

Navigate to the extension folder:
```bash
cd /path/to/tab-lock-pro
```

Copy the GitHub README:
```bash
mv README.md README-USER.md
mv README-GITHUB.md README.md
```

### Step 3: Initialize Git

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Tab Lock Pro v1.0.0"
```

### Step 4: Push to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/tab-lock-pro.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 5: Update Repository Settings

1. Go to your repository on GitHub
2. Click **Settings** → **General**
3. Add topics: `chrome-extension`, `browser-security`, `tab-locking`, `password-protection`, `biometric-auth`
4. Add website: `https://legendarycreation.gumroad.com/l/tab-lock-pro`

### Step 6: Update Links in Code

After Chrome Web Store approval, update these:

**In README.md:**
- Replace `YOUR_CHROME_STORE_LINK` with actual link
- Replace `YOUR_USERNAME` with your GitHub username
- Replace `YOUR_EMAIL@gmail.com` with your support email

**In Gumroad:**
- Update email template with Chrome Store link
- Add GitHub link to product description

---

## 📁 What Gets Uploaded to GitHub

### ✅ Included:
- All source code (manifest.json, *.js, *.html, *.css)
- Icons (both regular and gold)
- Documentation files
- README.md
- .gitignore
- Gumroad thumbnails

### ❌ Excluded (via .gitignore):
- Build/dist files
- ZIP files
- Node modules (if any)
- IDE files
- OS temporary files

---

## 🔒 Security Considerations

### What to INCLUDE:
✅ Source code (for transparency & auditing)
✅ Documentation
✅ Icons and assets
✅ Build scripts

### What to KEEP PRIVATE:
⚠️ **NEVER commit these:**
- API keys (if you add any later)
- Private keys
- Customer data
- License keys database

**Currently:** Your master key is hardcoded in `background.js` but that's okay - it's for testing/emergency use only.

---

## 🎨 Optional: Add Screenshots

Create a `screenshots/` folder:

```bash
mkdir screenshots
```

Add these screenshots:
1. `main.png` - Extension popup
2. `locked.png` - Lock screen
3. `pro-settings.png` - Pro settings page
4. `features.png` - Feature showcase

Then update README.md with actual screenshot paths.

---

## 📊 Repository Stats & Badges

Add these badges to your README (after deployment):

```markdown
[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/tab-lock-pro)](https://github.com/YOUR_USERNAME/tab-lock-pro)
[![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/tab-lock-pro)](https://github.com/YOUR_USERNAME/tab-lock-pro)
[![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/tab-lock-pro)](https://github.com/YOUR_USERNAME/tab-lock-pro/issues)
```

---

## 🔄 Future Updates

### When you make changes:

```bash
# After making changes
git add .
git commit -m "Description of changes"
git push origin main
```

### Version releases:

```bash
# Create a release tag
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```

Then create a release on GitHub with the ZIP file.

---

## 📝 GitHub Description

Use this for your repository description:

**Short:**
```
🔒 Secure your browser tabs with password & biometric authentication. Auto-lock, panic button, domain locking & more. $4.99 one-time Pro.
```

**Topics to add:**
- chrome-extension
- browser-security  
- tab-locking
- password-protection
- biometric-authentication
- privacy
- security
- chrome
- face-id
- fingerprint

---

## 🌟 After Deployment

### 1. Create GitHub Pages (Optional)

If you want a landing page:
1. Settings → Pages
2. Source: Deploy from branch
3. Branch: main → /docs (if you create one)

### 2. Add License

1. Add a LICENSE file
2. Use MIT, Apache 2.0, or create custom proprietary license
3. My recommendation: "Proprietary - Source Available for Audit"

### 3. Set Up Issues

1. Settings → Issues → Enable
2. Create issue templates (Bug report, Feature request)
3. Monitor and respond to user feedback

### 4. Create Discussions (Optional)

1. Settings → Discussions → Enable
2. Categories: General, Q&A, Ideas, Show and tell

---

## ✅ Deployment Checklist

**Before Pushing:**
- [ ] Remove any sensitive data
- [ ] Update README.md with your info
- [ ] Add .gitignore
- [ ] Test extension one more time
- [ ] Commit message is clear

**After Pushing:**
- [ ] Repository is public
- [ ] README displays correctly
- [ ] Topics added
- [ ] Description set
- [ ] Website link added
- [ ] Issues enabled

**After Chrome Store Approval:**
- [ ] Update Chrome Store link in README
- [ ] Update Gumroad with GitHub link
- [ ] Create first release (v1.0.0)
- [ ] Add screenshots

---

## 🎯 Quick Commands Reference

```bash
# Clone your repo (future)
git clone https://github.com/YOUR_USERNAME/tab-lock-pro.git

# Check status
git status

# See changes
git diff

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Pull latest changes
git pull origin main

# View commit history
git log --oneline
```

---

## 🚨 Troubleshooting

### Issue: "Repository not found"
```bash
# Check remote URL
git remote -v

# Update if wrong
git remote set-url origin https://github.com/YOUR_USERNAME/tab-lock-pro.git
```

### Issue: "Permission denied"
```bash
# Use HTTPS authentication
git remote set-url origin https://github.com/YOUR_USERNAME/tab-lock-pro.git

# Or set up SSH keys
```

### Issue: "Files too large"
- GitHub has 100MB file limit
- Your extension is ~200KB - no problem!
- If you add videos later, use Git LFS

---

## 📧 Support

If you need help with GitHub deployment:
- GitHub Docs: https://docs.github.com
- Git Guide: https://rogerdudler.github.io/git-guide/

---

## 🎉 You're Done!

Your repository is live at:
```
https://github.com/YOUR_USERNAME/tab-lock-pro
```

Now users can:
- ⭐ Star your repo
- 🐛 Report issues
- 🔍 Audit your code for security
- 🤝 Trust your extension more

**This increases conversion rates!** Open source = Trust = More sales! 💰

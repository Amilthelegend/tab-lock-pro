#!/bin/bash

# Tab Lock Pro - GitHub Deployment Script
# This script will help you deploy to GitHub in one command

echo "🚀 Tab Lock Pro - GitHub Deployment"
echo "===================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    echo "   Visit: https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username is required"
    exit 1
fi

echo ""
echo "📝 Repository will be created at:"
echo "   https://github.com/$GITHUB_USERNAME/tab-lock-pro"
echo ""

read -p "Continue? (y/n): " CONTINUE

if [ "$CONTINUE" != "y" ]; then
    echo "❌ Deployment cancelled"
    exit 0
fi

echo ""
echo "🔧 Preparing files..."

# Rename README files
if [ -f "README.md" ]; then
    mv README.md README-USER.md
    echo "   ✅ Renamed README.md to README-USER.md"
fi

if [ -f "README-GITHUB.md" ]; then
    mv README-GITHUB.md README.md
    echo "   ✅ Renamed README-GITHUB.md to README.md"
fi

# Update README with username
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/YOUR_USERNAME/$GITHUB_USERNAME/g" README.md
else
    # Linux
    sed -i "s/YOUR_USERNAME/$GITHUB_USERNAME/g" README.md
fi

echo "   ✅ Updated README with your username"

echo ""
echo "🔨 Initializing Git repository..."

# Initialize git
git init
echo "   ✅ Git initialized"

# Add all files
git add .
echo "   ✅ Files staged"

# Commit
git commit -m "Initial commit: Tab Lock Pro v1.0.0"
echo "   ✅ Initial commit created"

# Add remote
git remote add origin "https://github.com/$GITHUB_USERNAME/tab-lock-pro.git"
echo "   ✅ Remote added"

echo ""
echo "📤 Ready to push to GitHub!"
echo ""
echo "⚠️  IMPORTANT: Before pushing, you must:"
echo "   1. Go to https://github.com/new"
echo "   2. Create a repository named: tab-lock-pro"
echo "   3. Keep it PUBLIC"
echo "   4. Do NOT add README or .gitignore"
echo ""

read -p "Have you created the repository on GitHub? (y/n): " REPO_CREATED

if [ "$REPO_CREATED" != "y" ]; then
    echo ""
    echo "⏸️  Deployment paused"
    echo ""
    echo "Next steps:"
    echo "1. Create repository on GitHub"
    echo "2. Run: git branch -M main"
    echo "3. Run: git push -u origin main"
    exit 0
fi

echo ""
echo "🚀 Pushing to GitHub..."

# Push to GitHub
git branch -M main
git push -u origin main

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "🎉 Your repository is live at:"
echo "   https://github.com/$GITHUB_USERNAME/tab-lock-pro"
echo ""
echo "📋 Next steps:"
echo "   1. Add topics: chrome-extension, browser-security, tab-locking"
echo "   2. Add description and website URL"
echo "   3. Enable Issues in repository settings"
echo "   4. Update Chrome Store link after approval"
echo ""
echo "💡 View deployment guide: GITHUB_DEPLOYMENT.md"
echo ""

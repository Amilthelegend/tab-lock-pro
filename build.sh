#!/bin/bash

# Tab Lock Pro - Build and Package Script
# This script helps you prepare the extension for Chrome Web Store submission

echo "🔒 Tab Lock Pro - Build Script"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "manifest.json" ]; then
    echo "❌ Error: manifest.json not found. Please run this script from the extension root directory."
    exit 1
fi

# Create build directory
echo "📁 Creating build directory..."
BUILD_DIR="build"
PACKAGE_NAME="tab-lock-pro-v1.0.0.zip"

# Remove old build if exists
if [ -d "$BUILD_DIR" ]; then
    rm -rf "$BUILD_DIR"
fi

mkdir -p "$BUILD_DIR"

# Copy necessary files
echo "📋 Copying extension files..."

# Copy main files
cp manifest.json "$BUILD_DIR/"
cp background.js "$BUILD_DIR/"
cp content.js "$BUILD_DIR/"
cp popup.html "$BUILD_DIR/"
cp popup.js "$BUILD_DIR/"
cp locked.html "$BUILD_DIR/"
cp locked.js "$BUILD_DIR/"

# Copy directories
cp -r icons "$BUILD_DIR/"
cp -r styles "$BUILD_DIR/"

# Optional: Copy documentation for reference (won't be in final package)
# cp README.md "$BUILD_DIR/"

echo "✅ Files copied successfully"

# Create package for Chrome Web Store
echo "📦 Creating Chrome Web Store package..."
cd "$BUILD_DIR"
zip -r "../$PACKAGE_NAME" * -x "*.DS_Store" -x "*.git*" -x "*__MACOSX*"
cd ..

echo "✅ Package created: $PACKAGE_NAME"

# Calculate package size
SIZE=$(du -h "$PACKAGE_NAME" | cut -f1)
echo "📊 Package size: $SIZE"

# Verify package contents
echo ""
echo "📋 Package contents:"
unzip -l "$PACKAGE_NAME"

echo ""
echo "✅ Build complete!"
echo ""
echo "Next steps:"
echo "1. Test the extension by loading the '$BUILD_DIR' folder in Chrome"
echo "2. Go to chrome://extensions/"
echo "3. Enable 'Developer mode'"
echo "4. Click 'Load unpacked' and select the '$BUILD_DIR' folder"
echo "5. Test all features thoroughly"
echo "6. When ready, upload '$PACKAGE_NAME' to Chrome Web Store"
echo ""
echo "📚 Documentation:"
echo "- README.md - User documentation"
echo "- INTEGRATION_GUIDE.md - Payment integration"
echo "- CHROME_WEB_STORE.md - Submission guide"
echo ""
echo "Good luck! 🚀"

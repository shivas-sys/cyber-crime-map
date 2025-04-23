#!/bin/bash

# Script to build a static version of the site
echo "========================================"
echo "Building Crime Hotspot Mapping Application for Static Deployment"
echo "========================================"

# Create .env file for static build if it doesn't exist
if [ ! -f .env.static ]; then
  echo "Creating .env.static file..."
  echo "VITE_STATIC_DEPLOYMENT=true" > .env.static
fi

# Set static deployment environment variable
export VITE_STATIC_DEPLOYMENT=true

# Run the build with the static mode
echo "Running build process..."
npx vite build --mode production --emptyOutDir

# Copy static files to the build directory
echo "Copying static files..."
cp public/_static_config.js dist/public/
cp public/index-static.html dist/public/
cp public/favicon.svg dist/public/

# Build result
if [ $? -eq 0 ]; then
  echo "========================================"
  echo "✅ Static site build completed successfully!"
  echo "========================================"
  echo "📁 The static files are available in the dist directory"
  echo ""
  echo "To deploy this site, you can upload the contents of the dist directory"
  echo "to any static hosting service like:"
  echo "  - GitHub Pages"
  echo "  - Netlify"
  echo "  - Vercel"
  echo "  - Amazon S3"
  echo ""
  echo "📋 Deployment instructions:"
  echo "1. Download the dist folder content"
  echo "2. Upload to your preferred static hosting service"
  echo "3. No server configuration required - everything runs in the browser"
  echo "========================================"
else
  echo "❌ Build failed. Please check the error messages above."
fi
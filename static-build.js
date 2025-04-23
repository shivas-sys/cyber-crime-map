// Script to build the static version of the site
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Create a temporary .env file for the static build
fs.writeFileSync('.env.static', 'VITE_STATIC_DEPLOYMENT=true\n');

try {
  // Run vite build with the static environment
  console.log('Building static site...');
  execSync('vite build --mode production', { 
    env: { ...process.env, VITE_STATIC_DEPLOYMENT: 'true' },
    stdio: 'inherit'
  });
  
  console.log('\nStatic site build completed successfully!');
  console.log('The static files are available in the dist directory.');
  console.log('You can deploy these files to any static hosting service.');
  
} catch (error) {
  console.error('Error building static site:', error);
  process.exit(1);
} finally {
  // Clean up
  if (fs.existsSync('.env.static')) {
    fs.unlinkSync('.env.static');
  }
}
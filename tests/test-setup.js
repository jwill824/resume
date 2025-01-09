// test-setup.js
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the _site directory exists
function ensureSiteDirectory() {
  return new Promise((resolve, reject) => {
    exec('bundle exec jekyll build', (error, stdout, stderr) => {
      if (error) {
        console.error('Error building Jekyll site:', error);
        reject(error);
        return;
      }
      if (stderr) {
        console.error('Jekyll build stderr:', stderr);
      }
      console.log('Jekyll build stdout:', stdout);
      resolve();
    });
  });
}

// Create results directory if it doesn't exist
function createResultsDirectory() {
  const resultsDir = path.join(__dirname, '..', 'tests', 'results');
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }
}

// Main setup function
async function setup() {
  try {
    console.log('Building Jekyll site...');
    await ensureSiteDirectory();

    console.log('Creating test results directory...');
    createResultsDirectory();

    console.log('Setup complete!');
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

// Run setup if this script is run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  setup();
}

export default setup;

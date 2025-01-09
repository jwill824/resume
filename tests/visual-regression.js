import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { fileURLToPath } from 'url';
import setup from './test-setup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runVisualTests() {
  let browser;
  try {
    await setup();

    browser = await chromium.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 1024 });

    const siteDir = path.resolve('_site');
    const indexPath = path.join(siteDir, 'index.html');

    if (!fs.existsSync(indexPath)) {
      throw new Error('Site has not been built properly - index.html not found');
    }

    await page.goto(`file://${indexPath}`);
    await page.waitForSelector('.container', { timeout: 5000 });

    const screenshot = await page.screenshot({
      fullPage: true,
      type: 'png',
    });

    const resultsDir = path.join(__dirname, 'results');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }

    const currentPath = path.join(resultsDir, 'current.png');
    fs.writeFileSync(currentPath, screenshot);

    const baselinePath = path.join(__dirname, 'baseline.png');
    if (!fs.existsSync(baselinePath)) {
      throw new Error('Baseline image not found in tests directory. Please ensure it exists in source control.');
    }

    const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
    const current = PNG.sync.read(screenshot);

    if (baseline.width !== current.width || baseline.height !== current.height) {
      console.error('Dimensions changed:');
      console.error(`Baseline: ${baseline.width}x${baseline.height}`);
      console.error(`Current:  ${current.width}x${current.height}`);
      process.exit(1);
    }

    const diff = new PNG({ width: baseline.width, height: baseline.height });

    const numDiffPixels = pixelmatch(
      baseline.data,
      current.data,
      diff.data,
      baseline.width,
      baseline.height,
      {
        threshold: 0.1,
        includeAA: true,
        alpha: 0.5,
      }
    );

    const diffPath = path.join(resultsDir, 'diff.png');
    fs.writeFileSync(diffPath, PNG.sync.write(diff));

    const totalPixels = baseline.width * baseline.height;
    const diffPercentage = (numDiffPixels / totalPixels) * 100;
    const threshold = 0.1;

    if (diffPercentage > threshold) {
      console.error(`Visual differences detected (${diffPercentage.toFixed(2)}% different)`);
      console.error(`Current screenshot: ${currentPath}`);
      console.error(`Diff image: ${diffPath}`);
      process.exit(1);
    }

    console.log(`Visual comparison passed! ${diffPercentage.toFixed(2)}% difference`);
  } catch (error) {
    console.error('Error running visual tests:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  process.exit(0);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runVisualTests();
}

export default runVisualTests;

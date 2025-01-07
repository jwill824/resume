// tests/visual-regression.js
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { fileURLToPath } from 'url';
import setup from '../scripts/test-setup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runVisualTests() {
    let browser;
    try {
        // Ensure site is built
        await setup();

        browser = await chromium.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Set viewport size
        await page.setViewportSize({ width: 1280, height: 1024 });

        const siteDir = path.resolve('_site');
        const indexPath = path.join(siteDir, 'index.html');

        if (!fs.existsSync(indexPath)) {
            throw new Error('Site has not been built properly - index.html not found');
        }

        // Navigate to the page and wait for content
        await page.goto('file://' + indexPath);
        await page.waitForSelector('.container', { timeout: 5000 });

        // Take a screenshot
        const screenshot = await page.screenshot({
            fullPage: true,
            type: 'png'
        });

        // Ensure results directory exists
        const resultsDir = path.join(__dirname, 'results');
        if (!fs.existsSync(resultsDir)) {
            fs.mkdirSync(resultsDir, { recursive: true });
        }

        // Save current screenshot
        const currentPath = path.join(resultsDir, 'current.png');
        fs.writeFileSync(currentPath, screenshot);
        console.log(`Screenshot saved to: ${currentPath}`);

        // Compare with baseline if it exists
        const baselinePath = path.join(__dirname, 'baseline.png');
        if (fs.existsSync(baselinePath)) {
            const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
            const current = PNG.sync.read(screenshot);

            if (baseline.width !== current.width || baseline.height !== current.height) {
                console.log('Dimensions changed:');
                console.log(`Baseline: ${baseline.width}x${baseline.height}`);
                console.log(`Current:  ${current.width}x${current.height}`);

                if (process.env.CI) {
                    console.log('Dimensions changed in CI environment - failing test');
                    process.exit(1);
                }

                // In local development, update the baseline
                console.log('Dimensions have changed - updating baseline...');
                fs.copyFileSync(currentPath, baselinePath);
                console.log('Baseline updated. Please review the changes.');
                process.exit(0);
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
                    alpha: 0.5
                }
            );

            // Save diff image
            const diffPath = path.join(resultsDir, 'diff.png');
            fs.writeFileSync(diffPath, PNG.sync.write(diff));

            // Calculate difference percentage
            const totalPixels = baseline.width * baseline.height;
            const diffPercentage = (numDiffPixels / totalPixels) * 100;

            // Stricter threshold in CI
            const threshold = process.env.CI ? 0.1 : 1;

            if (diffPercentage > threshold) {
                console.error(`Visual differences detected (${diffPercentage.toFixed(2)}% different)`);
                console.error(`Diff image saved to: ${diffPath}`);
                process.exit(1);
            } else {
                console.log(`Visual comparison passed! ${diffPercentage.toFixed(2)}% difference`);
            }
        } else {
            // No baseline exists
            console.log('No baseline found, creating one...');
            fs.copyFileSync(currentPath, baselinePath);

            if (process.env.CI) {
                console.log('Created baseline in CI environment - failing test');
                process.exit(1);
            } else {
                console.log(`Baseline created at: ${baselinePath}`);
                process.exit(0);
            }
        }
    } catch (error) {
        console.error('Error running visual tests:', error);
        process.exit(1);
    } finally {
        if (browser) {
            await browser.close();
        }
    }

    // Only reach here if tests pass
    process.exit(0);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    runVisualTests();
}

export default runVisualTests;
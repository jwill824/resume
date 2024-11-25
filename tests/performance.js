// tests/performance.js
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import setup from '../scripts/test-setup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runPerformanceTests() {
    try {
        // Ensure site is built
        await setup();

        const browser = await chromium.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        const siteDir = path.resolve('_site');
        const indexPath = path.join(siteDir, 'index.html');

        if (!fs.existsSync(indexPath)) {
            throw new Error('Site has not been built properly - index.html not found');
        }

        // Instead of using Lighthouse (which requires a server),
        // let's measure key performance metrics directly
        await page.goto('file://' + indexPath);

        // Collect performance metrics
        const metrics = await page.evaluate(() => ({
            // Load performance
            loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
            domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,

            // Resource counts
            scripts: document.getElementsByTagName('script').length,
            styles: document.getElementsByTagName('link').length,
            images: document.getElementsByTagName('img').length,

            // DOM metrics
            domSize: document.getElementsByTagName('*').length,

            // Check for performance best practices
            deferredScripts: Array.from(document.getElementsByTagName('script'))
                .filter(script => script.defer || script.async).length,

            // Check for optimization best practices
            hasViewport: !!document.querySelector('meta[name="viewport"]'),
            hasDescription: !!document.querySelector('meta[name="description"]'),
            hasCanonicalLink: !!document.querySelector('link[rel="canonical"]')
        }));

        // Ensure results directory exists
        const resultsDir = path.join(__dirname, 'results');
        if (!fs.existsSync(resultsDir)) {
            fs.mkdirSync(resultsDir, { recursive: true });
        }

        // Save results
        const resultsPath = path.join(resultsDir, 'performance.json');
        fs.writeFileSync(resultsPath, JSON.stringify(metrics, null, 2));

        // Generate a more readable summary
        const summaryPath = path.join(resultsDir, 'performance-summary.md');
        let summary = '# Performance Test Results\n\n';

        summary += '## Load Times\n';
        summary += `- Page Load: ${metrics.loadTime}ms\n`;
        summary += `- DOM Content Loaded: ${metrics.domContentLoaded}ms\n\n`;

        summary += '## Resource Counts\n';
        summary += `- Scripts: ${metrics.scripts}\n`;
        summary += `- Stylesheets: ${metrics.styles}\n`;
        summary += `- Images: ${metrics.images}\n`;
        summary += `- Total DOM Elements: ${metrics.domSize}\n\n`;

        summary += '## Best Practices\n';
        summary += `- Deferred/Async Scripts: ${metrics.deferredScripts}/${metrics.scripts}\n`;
        summary += `- Viewport Meta Tag: ${metrics.hasViewport ? '✅' : '❌'}\n`;
        summary += `- Meta Description: ${metrics.hasDescription ? '✅' : '❌'}\n`;
        summary += `- Canonical Link: ${metrics.hasCanonicalLink ? '✅' : '❌'}\n`;

        fs.writeFileSync(summaryPath, summary);

        // Log results to console
        console.log('\nPerformance Test Results:');
        console.log(`Load Time: ${metrics.loadTime}ms`);
        console.log(`DOM Content Loaded: ${metrics.domContentLoaded}ms`);
        console.log(`DOM Size: ${metrics.domSize} elements`);

        // Check against thresholds
        const failures = [];
        if (metrics.loadTime > 3000) failures.push('Page load time exceeds 3s');
        if (metrics.domContentLoaded > 1000) failures.push('DOM content load exceeds 1s');
        if (metrics.domSize > 1500) failures.push('DOM size exceeds 1500 elements');
        if (!metrics.hasViewport) failures.push('Missing viewport meta tag');
        if (!metrics.hasDescription) failures.push('Missing meta description');

        if (failures.length > 0) {
            console.error('\nPerformance test failures:');
            failures.forEach(failure => console.error(`- ${failure}`));
            process.exit(1);
        } else {
            console.log('\n✅ All performance metrics within acceptable ranges!');
        }

        await browser.close();
    } catch (error) {
        console.error('Error running performance tests:', error);
        process.exit(1);
    }
}

// Run the tests if this script is run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    runPerformanceTests();
}

export default runPerformanceTests;
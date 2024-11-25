// tests/accessibility.js
import { chromium } from 'playwright';
import axe from 'axe-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import setup from '../scripts/test-setup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runAccessibilityTests() {
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

        // Navigate to the page and inject axe-core
        await page.goto('file://' + indexPath);
        await page.addScriptTag({ content: axe.source });

        // Run accessibility tests
        const results = await page.evaluate(() => {
            return new Promise(resolve => {
                axe.run((err, results) => {
                    if (err) throw err;
                    resolve(results);
                });
            });
        });

        // Ensure results directory exists
        const resultsDir = path.join(__dirname, 'results');
        if (!fs.existsSync(resultsDir)) {
            fs.mkdirSync(resultsDir, { recursive: true });
        }

        // Save detailed results
        const reportPath = path.join(resultsDir, 'accessibility.json');
        fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

        // Generate a more readable summary
        const summaryPath = path.join(resultsDir, 'accessibility-summary.md');
        let summary = '# Accessibility Test Results\n\n';

        if (results.violations.length > 0) {
            summary += `Found ${results.violations.length} accessibility violations:\n\n`;
            results.violations.forEach(violation => {
                summary += `## ${violation.help}\n`;
                summary += `Impact: ${violation.impact}\n`;
                summary += `Description: ${violation.description}\n`;
                summary += 'Elements affected:\n';
                violation.nodes.forEach(node => {
                    summary += `- \`${node.html}\`\n`;
                });
                summary += '\n';
            });
        } else {
            summary += '✅ No accessibility violations found!\n';
        }

        fs.writeFileSync(summaryPath, summary);

        // Log results to console
        if (results.violations.length > 0) {
            console.error(`Found ${results.violations.length} accessibility violations:`);
            results.violations.forEach(violation => {
                console.error(`\n${violation.help} - ${violation.description}`);
                console.error(`Impact: ${violation.impact}`);
                console.error('Elements affected:');
                violation.nodes.forEach(node => {
                    console.error(`- ${node.html}`);
                });
            });
            process.exit(1);
        } else {
            console.log('✅ No accessibility violations found!');
        }

        await browser.close();
    } catch (error) {
        console.error('Error running accessibility tests:', error);
        process.exit(1);
    }
}

// Run the tests if this script is run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    runAccessibilityTests();
}

export default runAccessibilityTests;
import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { join } from 'path';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Set viewport first
        await page.setViewport({
            width: 1200,
            height: 800
        });

        // Read the CSS file content
        const cssContent = readFileSync('_site/assets/css/styles.css', 'utf8');

        // Navigate to the HTML file
        await page.goto(`file:${process.cwd()}/_site/index.html`, {
            waitUntil: ['networkidle0', 'domcontentloaded']
        });

        // Inject styles directly into the page
        await page.addStyleTag({ content: cssContent });

        // Use evaluate to ensure everything is loaded
        await page.evaluate(() => {
            return new Promise((resolve) => {
                if (document.readyState === 'complete') {
                    resolve();
                } else {
                    window.addEventListener('load', resolve);
                }
            });
        });

        // Generate PDF with proper settings
        await page.pdf({
            path: '_site/resume.pdf',
            format: 'A4',
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            },
            printBackground: true,
            preferCSSPageSize: true
        });

        await browser.close();
        console.log('PDF generated successfully');
    } catch (error) {
        console.error('Error generating PDF:', error);
        process.exit(1);
    }
})();
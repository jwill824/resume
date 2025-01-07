import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';

async function generatePDF() {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 1200,
      height: 800,
    });

    const cssContent = readFileSync('_site/assets/css/styles.css', 'utf8');

    await page.goto(`file:${process.cwd()}/_site/index.html`, {
      waitUntil: ['networkidle0', 'domcontentloaded'],
    });

    await page.addStyleTag({ content: cssContent });

    await page.evaluate(() => {
      return new Promise((resolve) => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', resolve);
        }
      });
    });

    await page.pdf({
      path: '_site/resume.pdf',
      format: 'A4',
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();
    console.log('PDF generated successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
}

// Export the function
export default generatePDF;

// Run if called directly from command line
if (process.argv[1]?.endsWith('generate-pdf.js')) {
  generatePDF();
}

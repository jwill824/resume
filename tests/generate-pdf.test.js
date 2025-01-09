/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';

// First set up the mock objects we'll need
let mockPage;
let mockBrowser;

// Mock puppeteer before importing it
jest.mock('puppeteer', () => {
  // Create the mock implementation
  const puppeteerMock = {
    launch: jest.fn().mockImplementation(() => mockBrowser),
  };
  return {
    __esModule: true,
    default: puppeteerMock,
  };
});

// Mock fs with actual implementation except for readFileSync
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  readFileSync: jest.fn(),
}));

// Import mocked modules
import { readFileSync } from 'fs';

describe('PDF Generation', () => {
  let generatePDF;
  let mockConsoleLog;
  let mockConsoleError;
  let mockExit;

  beforeEach(async () => {
    // Clear all mocks
    jest.clearAllMocks();

    // Setup mock page
    mockPage = {
      setViewport: jest.fn().mockResolvedValue(undefined),
      goto: jest.fn().mockResolvedValue(undefined),
      addStyleTag: jest.fn().mockResolvedValue(undefined),
      evaluate: jest.fn().mockResolvedValue(undefined),
      pdf: jest.fn().mockResolvedValue(undefined),
    };

    // Setup mock browser
    mockBrowser = {
      newPage: jest.fn().mockResolvedValue(mockPage),
      close: jest.fn().mockResolvedValue(undefined),
    };

    // Mock console methods
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => { });
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

    // Mock process.exit
    mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { });

    // Setup fs mock
    readFileSync.mockReturnValue('mock-css-content');

    // Re-import the module under test for each test
    jest.isolateModules(async () => {
      const { default: importedGeneratePDF } = await import('../scripts/generate-pdf.js');
      generatePDF = importedGeneratePDF;
    });
  });

  afterEach(() => {
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
    mockExit.mockRestore();
  });

  it('should set correct viewport dimensions', async () => {
    await generatePDF();

    expect(mockPage.setViewport).toHaveBeenCalledWith({
      width: 1200,
      height: 800,
    });
  });

  it('should read and inject CSS correctly', async () => {
    await generatePDF();

    expect(readFileSync).toHaveBeenCalledWith('_site/assets/css/styles.css', 'utf8');

    expect(mockPage.addStyleTag).toHaveBeenCalledWith({
      content: 'mock-css-content',
    });
  });

  it('should navigate to correct HTML file', async () => {
    await generatePDF();

    const expectedPath = `file:${process.cwd()}/_site/index.html`;
    expect(mockPage.goto).toHaveBeenCalledWith(expectedPath, {
      waitUntil: ['networkidle0', 'domcontentloaded'],
    });
  });

  it('should generate PDF with correct settings', async () => {
    await generatePDF();

    expect(mockPage.pdf).toHaveBeenCalledWith({
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
  });

  it('should close browser after PDF generation', async () => {
    await generatePDF();

    expect(mockBrowser.close).toHaveBeenCalled();
    expect(mockConsoleLog).toHaveBeenCalledWith('PDF generated successfully');
  });

  it('should handle file read errors', async () => {
    const fileError = new Error('File not found');
    readFileSync.mockImplementation(() => {
      throw fileError;
    });

    await generatePDF();

    expect(mockConsoleError).toHaveBeenCalledWith('Error generating PDF:', fileError);
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should handle page operation errors', async () => {
    const pageError = new Error('Page operation failed');
    mockPage.pdf.mockRejectedValueOnce(pageError);

    await generatePDF();

    expect(mockConsoleError).toHaveBeenCalledWith('Error generating PDF:', pageError);
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});

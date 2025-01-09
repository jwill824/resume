// tests/setup.js
require('@testing-library/jest-dom');

// Add TextEncoder/TextDecoder to global for tests
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock the window.fs API that's available in the browser environment
global.window = {
  fs: {
    readFile: jest.fn(),
  },
};

// Setup any other global mocks or configurations needed for tests
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  writeFileSync: jest.fn(),
  readFileSync: jest.fn(),
}));

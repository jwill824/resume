// jest.config.cjs
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: [
    '<rootDir>/tests/**/*.test.js'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.jsx?$': ['babel-jest', { configFile: './babel.config.cjs' }]
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/_site/',
    '/vendor/'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'assets/js/**/*.js',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'tests/results/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true,
  // Remove extensionsToTreatAsEsm since we're using "type": "module"
  transformIgnorePatterns: [
    'node_modules/(?!(puppeteer)/)'
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node']
};
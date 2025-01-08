// jest.config.cjs
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.cjs'],
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.jsx?$': ['babel-jest', { configFile: './babel.config.cjs' }],
  },
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: ['!**/node_modules/**'],
  coverageDirectory: 'tests/results/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coveragePathIgnorePatterns: ['<rootDir>/_site/', '<rootDir>/vendor/', '<rootDir>/tests/'],
  verbose: true,
  transformIgnorePatterns: ['node_modules/(?!(puppeteer)/)'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};

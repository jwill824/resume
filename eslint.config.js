// eslint.config.js
import eslint from '@eslint/js';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-config-prettier';

export default [
  eslint.configs.recommended,
  // Base configuration for all files
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Node.js globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'writable',
        console: 'readonly',
        global: 'readonly',
      },
    },
    plugins: {
      jest: jest,
    },
    rules: {
      indent: ['error', 4],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
  // Configuration for test files
  {
    files: ['tests/**/*.js', '**/*.test.js'],
    languageOptions: {
      globals: {
        // Jest globals
        jest: 'readonly',
        expect: 'readonly',
        test: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        it: 'readonly',
        // Browser globals that might be used in tests
        window: 'readonly',
        document: 'readonly',
        performance: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        TextEncoder: 'readonly',
        TextDecoder: 'readonly',
      },
    },
    rules: {
      'jest/expect-expect': 'off',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/valid-expect': 'error',
    },
  },
  // Configuration for browser-targeted files
  {
    files: ['scripts/generate-pdf.js'],
    languageOptions: {
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        performance: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
      },
    },
  },
  {
    ignores: ['**/tests/results/**'],
  },
  prettier,
];

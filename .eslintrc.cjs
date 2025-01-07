// .eslintrc.cjs
module.exports = {
    env: {
        browser: true,
        es2022: true,
        node: true,
        jest: true
    },
    extends: [
        'eslint:recommended',
        'plugin:jest/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['jest'],
    rules: {
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-unused-vars': 'warn',
        'no-console': 'off',
        'jest/expect-expect': 'warn',
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/valid-expect': 'error'
    },
    overrides: [
        {
            files: ['tests/**/*.js'],
            rules: {
                'jest/expect-expect': 'off'
            }
        }
    ]
};
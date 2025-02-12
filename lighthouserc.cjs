module.exports = {
  ci: {
    collect: {
      staticDistDir: './_site',
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'interactive': ['error', { maxNumericValue: 3000 }],
        'speed-index': ['error', { maxNumericValue: 2500 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],

        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],

        'meta-description': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'crawlable-anchors': 'error',
        'link-text': 'error',
        'tap-targets': 'error',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

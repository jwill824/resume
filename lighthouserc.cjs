module.exports = {
  ci: {
    collect: {
      staticDistDir: './_site',
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
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

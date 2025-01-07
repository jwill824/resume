# Personal Resume Site

A Jekyll-based resume website with automated PDF generation, dynamic skill years calculation, comprehensive testing, and GitHub Pages deployment.

## 🎯 Overview

This repository contains my professional resume, built using Jekyll and automatically deployed to GitHub Pages. It features:

- Responsive design with SCSS
- Automated PDF generation with proper styling
- Version-controlled content in YAML format
- Comprehensive test suite
- Automated builds and deployments
- Print-optimized styling

## 🏗️ Repository Structure

```
resume/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions workflow
├── _data/
│   └── resume.yml           # Main content in YAML format
├── _layouts/
│   └── default.html         # Main layout template
├── _sass/
│   ├── _resume.scss         # Main styles
│   └── _print.scss          # Print-specific styles
├── assets/
│   ├── css/
│   │   └── styles.scss      # Main SCSS importer
│   └── js/
│       └── skills.js        # Skills experience calculator
├── tests/
│   ├── accessibility.js     # Accessibility testing
│   ├── performance.js       # Performance testing
│   ├── skills.test.js      # Unit tests for skills calculation
│   └── visual-regression.js # Visual regression testing
├── scripts/
│   └── test-setup.js       # Test environment setup
├── .htmlvalidate.json       # HTML validation config
├── .gitignore
├── _config.yml             # Jekyll configuration
├── Gemfile                 # Ruby dependencies
├── jest.config.js          # Jest configuration
├── package.json            # Node.js dependencies
├── index.html              # Main template with Liquid tags
└── README.md               # This file
```

## 📝 Content Structure

### YAML Data Format

Content is stored in `_data/resume.yml` with the following structure:

```yaml
contact:
  name: "Your Name"
  title: "Your Title"
  location: "Your Location"
  email: "your.email@example.com"
  linkedin: "linkedin-profile-id"

skills:
  - category: "Category Name"
    items: "Skill 1, Skill 2, Skill 3"

experience:
  - company: "Company Name"
    organization: "Organization"
    date: "Date Range"
    achievements:
      - "Achievement 1"
      - "Achievement 2"

certifications:
  - title: "Certification Name"
```

### Dynamic Skills Experience

The site automatically calculates years of experience for skills based on work history:

- Parses dates from experience entries
- Matches skills mentioned in achievements
- Displays year count next to each skill
- Updates automatically as experience grows

### Styling Structure

The site uses SCSS with Jekyll's built-in SASS processing:

- `_sass/_resume.scss`: Main styles with responsive design
- `_sass/_print.scss`: Print/PDF-specific styles
- `assets/css/styles.scss`: Import file with front matter

## 🧪 Testing Infrastructure

### Test Suites

1. **Unit Tests** (Jest)
   - Skills experience calculation
   - Date parsing and formatting
   - Edge case handling

   ```bash
   npm run test:unit
   ```

2. **Accessibility Testing** (Playwright + axe-core)
   - WCAG compliance checking
   - Screen reader compatibility
   - Keyboard navigation
   - Generates detailed reports in Markdown and JSON

   ```bash
   npm run test:accessibility
   ```

3. **Visual Regression Testing** (Playwright)
   - Screenshot comparison
   - Layout consistency
   - Responsive design verification
   - Cross-platform compatibility
   - Generates diff images for review

   ```bash
   npm run test:visual
   ```

4. **Performance Testing** (Playwright + Lighthouse)
   - Performance scores
   - Accessibility scores
   - Best practices verification
   - SEO optimization
   - Generates HTML and JSON reports

   ```bash
   npm run test:performance
   ```

### Test Reports

All test results are saved in the `tests/results` directory:

- `accessibility.json` - Detailed accessibility violations
- `accessibility-summary.md` - Human-readable accessibility report
- `lighthouse-results.json` - Full Lighthouse data
- `lighthouse-report.html` - Interactive Lighthouse report
- `performance-summary.md` - Key performance metrics
- Visual regression images:
  - `baseline.png` - Reference screenshot
  - `current.png` - Latest test screenshot
  - `diff.png` - Visual differences highlighted

### Running Tests

```bash
# Run all tests
npm test

# Run individual test suites
npm run test:unit
npm run test:accessibility
npm run test:visual
npm run test:performance

# Watch mode for development
npm run test:watch
```

### Test Configuration

- Accessibility tests validate against WCAG 2.1 standards
- Performance threshold set to 90 for all Lighthouse categories
- Visual regression allows 1% pixel difference threshold
- Unit tests run with Jest in jsdom environment

### Common Testing Tasks

1. **Update Visual Baseline**

   ```bash
   rm tests/baseline.png
   npm run test:visual
   ```

2. **Review Test Reports**

   ```bash
   # Open test results in browser
   open tests/results/lighthouse-report.html
   # View accessibility summary
   cat tests/results/accessibility-summary.md
   ```

3. **Debug Visual Differences**

   ```bash
   # Check diff image
   open tests/results/diff.png
   ```

## 🚀 Development Setup

### Using Dev Container (Recommended)

This project includes a dev container configuration for VS Code that sets up all necessary dependencies automatically. To use it:

1. Install [VS Code](https://code.visualstudio.com/) and the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
2. Clone this repository
3. Open in VS Code and click "Reopen in Container" when prompted
4. The container will automatically install all dependencies:
   - Ruby and Jekyll
   - Node.js and npm packages
   - Playwright for testing
   - System dependencies for visual testing
   - All project-specific dependencies

### Manual Setup

If not using the dev container, you'll need to install dependencies manually:

1. Install Ruby and development tools:

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install ruby-full build-essential zlib1g-dev

# Add Ruby paths to your shell
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

2. Install Jekyll and Bundler:

```bash
gem install jekyll bundler
```

3. Install system dependencies for testing:

```bash
sudo apt-get install -y \
    libgbm-dev \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2
```

4. Install project dependencies:

```bash
# Ruby dependencies
bundle install

# Node.js dependencies
npm install

# Playwright browser
npx playwright install chromium
```

### Local Development

```bash
# Start Jekyll server
bundle exec jekyll serve

# Build site
bundle exec jekyll build

# Run tests in watch mode
npm run test:watch
```

## 🔍 Troubleshooting

### Common Issues

1. **Test Environment Setup**
   - If using devcontainer, try rebuilding the container
   - Ensure Ruby and Node.js are installed
   - Check all dependencies are installed
   - Verify Jekyll site builds correctly

2. **Visual Regression Testing**
   - First run creates baseline
   - Subsequent runs compare against baseline
   - Check `tests/results` for diff images

3. **Accessibility Testing**
   - Review violations in test output
   - Check WCAG compliance levels
   - Verify aria labels and roles

4. **Performance Testing**
   - Monitor Lighthouse scores
   - Check for performance regressions
   - Optimize assets if needed

## 🔄 Maintenance

### Regular Tasks

1. Update content monthly/quarterly
2. Run full test suite after updates
3. Review and update dependencies
4. Check visual regression baselines
5. Monitor accessibility compliance
6. Verify print layout
7. Update years of experience calculations

### Security

- Keep Jekyll up to date
- Review GitHub security alerts
- Update Node.js dependencies
- Monitor test results for regressions

## 📚 Additional Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Jest Testing Framework](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [axe-core Accessibility Testing](https://github.com/dequelabs/axe-core)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse/)

## 📄 License

This project is open-source and available under the MIT License.

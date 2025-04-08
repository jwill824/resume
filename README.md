# Personal Resume Site

A Jekyll-based resume website with automated PDF generation, comprehensive testing, and GitHub Pages deployment.

## 🎯 Overview

This repository contains my professional resume, built using Jekyll and
automatically deployed to GitHub Pages. It features:

- Responsive design with SCSS
- Automated PDF generation with proper styling
- Version-controlled content in YAML format
- Comprehensive test suite
- Automated builds and deployments
- Print-optimized styling

## 📝 Content Structure

### YAML Data Format

Content is stored in `_data/resume.yml` with the following structure:

```yaml
contact:
  name: 'Your Name'
  title: 'Your Title'
  location: 'Your Location'
  email: 'your.email@example.com'
  linkedin: 'linkedin-profile-id'
  github: 'github-profile-id'

experience:
  - company: 'Company Name'
    client: 'Client Name'
    role: 'Role at Client or Company'
    date: 'Date Range'
    achievements:
      - 'Achievement 1'
      - 'Achievement 2'

skills:
  underscore_delimited_skill_category_1: 'Comma delimited skill list'
  underscore_delimited_skill_category_2: 'Comma delimited skill list'

projects:
  - name: 'Project Name'
    description: 'Project Description'
    technologies: 'Comma delimited list of technologies used'

education:
  - institution: 'School Name'
    degree: 'Degree Name'
    date: 'Date Graduated'

certifications:
  - title: 'Certification Name'
```

## 🧪 Testing Infrastructure

### Test Suites

1. **Unit Tests** (Jest)

   - PDF generation

   ```bash
   npm run test:unit
   ```

2. **Visual Regression Testing** (Playwright)

   - Screenshot comparison
   - Layout consistency
   - Responsive design verification
   - Cross-platform compatibility
   - Generates diff images for review

   ```bash
   npm run test:visual
   ```

3. **Performance Testing** (Lighthouse)

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

- `lighthouse-report.html` - Interactive Lighthouse report
- `coverage/` - Code coverage via Jest
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
npm run test:visual
npm run test:performance

# Watch mode for development
npm run test:watch
```

### Test Configuration

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
   ```

3. **Debug Visual Differences**

   ```bash
   # Check diff image
   open tests/results/diff.png
   ```

## 🚀 Development Setup

### Using Dev Container (Recommended)

This project includes a dev container configuration for VS Code that sets up
all necessary dependencies automatically. To use it:

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
# Can view resume at http://0.0.0.0:4000/resume/
npm run serve

# Build site
npm run build

# Run tests in watch mode
npm run test:watch
```

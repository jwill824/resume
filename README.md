# Personal Resume Site

A Jekyll-based resume website with automated PDF generation and GitHub Pages deployment.

## 🎯 Overview

This repository contains my professional resume, built using Jekyll and automatically deployed to GitHub Pages. It features:
- Responsive design
- Automated PDF generation
- Version-controlled content
- Automated builds and deployments

## 🏗️ Repository Structure
```
resume/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
├── _data/
│   └── resume.yml         # Main content in YAML format
├── _layouts/
│   └── default.html       # Main layout template
├── assets/
│   └── css/
│       └── styles.scss    # Styles with Jekyll front matter
├── .gitignore
├── _config.yml           # Jekyll configuration
├── Gemfile              # Ruby dependencies
├── index.html           # Main template with Liquid tags
└── README.md            # This file
```

## 🚀 Deployment Workflow

### Automated Deployment
The site automatically deploys when:
- Changes are pushed to the `main` branch
- Pull requests are created
- Manually triggered via GitHub Actions

The workflow (`deploy.yml`) performs these steps:
1. Sets up Ruby and Jekyll
2. Builds the Jekyll site
3. Generates a PDF version
4. Validates HTML
5. Deploys to GitHub Pages
6. Creates GitHub release (if tagged)

### Manual Release Process
To create a new release version:
```bash
# Create a new tag
git tag v1.0.0

# Push the tag
git push origin v1.0.0
```

This will trigger the workflow to:
- Create a new GitHub release
- Attach the PDF version
- Deploy the latest version

## 🛠️ Local Development

### Initial Setup

1. Install Ruby and dependencies:
```bash
# Install Ruby (if needed)
brew install ruby    # macOS
sudo apt install ruby-full  # Ubuntu

# Install bundler and dependencies
gem install bundler
bundle install
```

2. Install Node.js dependencies (for PDF generation):
```bash
npm init -y
npm install puppeteer html-validate
```

### Local Testing
```bash
# Start Jekyll server
bundle exec jekyll serve

# Build site without serving
bundle exec jekyll build

# Validate HTML
npx html-validate _site/index.html
```

## 📝 Content Updates

### Updating Resume Content
1. Edit `_data/resume.yml` to update:
   - Contact information
   - Work experience
   - Skills
   - Education
   - Certifications
   - Projects

2. Commit and push changes:
```bash
git add _data/resume.yml
git commit -m "Update resume content"
git push origin main
```

### Styling Updates
1. Modify `assets/css/styles.scss`
2. Test locally using `bundle exec jekyll serve`
3. Commit and push changes

## 🔄 GitHub Actions Workflow Details

### Workflow Triggers
- `push` to main branch
- `pull_request` to main branch
- Manual trigger via `workflow_dispatch`

### Environment Requirements
- GitHub Pages enabled
- Proper permissions set:
  - `contents: write`
  - `pages: write`
  - `id-token: write`

### Build Process
1. **Jekyll Build**
   - Builds site from source
   - Generates static files in `_site`

2. **PDF Generation**
   - Uses Puppeteer to create PDF
   - Captures entire resume page
   - Saves as `resume.pdf`

3. **Validation**
   - Checks HTML validity
   - Ensures proper build

4. **Deployment**
   - Pushes to GitHub Pages
   - Creates release (if tagged)

## 🏷️ Versioning and Releases

### Tagging Strategy
Use semantic versioning:
- `v1.0.0`: Major changes
- `v1.1.0`: New sections/features
- `v1.1.1`: Content updates/fixes

### Creating a Release
```bash
# Create annotated tag
git tag -a v1.0.0 -m "Version 1.0.0 - Initial release"

# Push tag
git push origin v1.0.0
```

### Release Contents
Each release includes:
- Tagged version of the site
- PDF version of resume
- Release notes (automated)

## 🔍 Monitoring and Troubleshooting

### Common Issues

1. **PDF Generation Fails**
   - Check Puppeteer installation
   - Verify HTML structure
   - Check GitHub Actions logs

2. **Jekyll Build Fails**
   - Verify Jekyll configuration
   - Check for syntax errors in markdown/HTML
   - Validate YAML formatting

3. **CSS Not Loading**
   - Check file paths
   - Verify Jekyll front matter in SCSS
   - Check GitHub Pages URL structure

### GitHub Pages URL
- Production: `https://[username].github.io/resume/`
- Preview (PR): Available in GitHub Actions summary

## 📊 Maintenance

### Regular Tasks
1. Update content monthly/quarterly
2. Review and update dependencies
3. Check for broken links
4. Validate mobile responsiveness

### Security
- Keep Jekyll up to date
- Review GitHub security alerts
- Update dependencies regularly

## 📚 Additional Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Puppeteer Documentation](https://pptr.dev/)

## 📄 License

This project is open-source and available under the MIT License.
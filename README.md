# Personal Resume Site

A Jekyll-based resume website with automated PDF generation and GitHub Pages deployment.

## 🎯 Overview

This repository contains my professional resume, built using Jekyll and automatically deployed to GitHub Pages. It features:
- Responsive design with SCSS
- Automated PDF generation with proper styling
- Version-controlled content in YAML format
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
│   └── css/
│       └── styles.scss      # Main SCSS importer
├── .htmlvalidate.json       # HTML validation config
├── .gitignore
├── _config.yml             # Jekyll configuration
├── Gemfile                 # Ruby dependencies
├── index.html              # Main template with Liquid tags
└── README.md              # This file
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

### Styling Structure
The site uses SCSS with Jekyll's built-in SASS processing:
- `_sass/_resume.scss`: Main styles
- `_sass/_print.scss`: Print/PDF-specific styles
- `assets/css/styles.scss`: Import file with front matter

## 🚀 Deployment Workflow

### Automated Deployment
The site automatically deploys when:
- Changes are pushed to the `main` branch
- Pull requests are created
- Manually triggered via GitHub Actions

The workflow (`deploy.yml`) performs these steps:
1. Sets up Ruby and Jekyll
2. Builds the Jekyll site
3. Processes SCSS to CSS
4. Generates a PDF version with proper styling
5. Validates HTML
6. Deploys to GitHub Pages
7. Creates GitHub release (if tagged)

### PDF Generation
PDF generation includes:
- Proper styling and formatting
- Print-specific styles
- Background colors and images
- Responsive layout adjustments

### HTML Validation
Validates against:
- HTML5 standards
- Proper character encoding
- No trailing whitespace
- Correct meta tags

## 🛠️ Local Development

### Initial Setup

1. Install Ruby dependencies:
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

## 📝 Making Updates

### Content Updates
1. Edit `_data/resume.yml` to update:
   - Contact information
   - Work experience
   - Skills
   - Education
   - Certifications (using proper title format)
   - Projects

2. Commit and push changes:
```bash
git add _data/resume.yml
git commit -m "Update resume content"
git push origin main
```

### Style Updates
1. Modify SCSS files:
   - Main styles in `_sass/_resume.scss`
   - Print styles in `_sass/_print.scss`
2. Test locally using `bundle exec jekyll serve`
3. Check PDF output in browser print preview

### Creating Releases
```bash
# Create and tag a new version
git tag -a v1.0.0 -m "Version 1.0.0 - Initial release"
git push origin v1.0.0
```

## 🔍 Troubleshooting

### Common Issues

1. **Styles Not Applying to PDF**
   - Check print styles in `_sass/_print.scss`
   - Verify CSS compilation in `_site/assets/css/`
   - Check PDF generation logs in GitHub Actions

2. **SCSS Not Compiling**
   - Verify front matter (--- ---) in `styles.scss`
   - Check `_config.yml` SASS settings
   - Verify file locations in `_sass` directory

3. **HTML Validation Errors**
   - Check `.htmlvalidate.json` configuration
   - Verify proper character encoding in templates
   - Remove trailing whitespace

4. **Certification Format Issues**
   - Use proper YAML structure with `title` key
   - Check for proper indentation
   - Verify Liquid template syntax

## 🔄 Maintenance

### Regular Tasks
1. Update content monthly/quarterly
2. Review and update dependencies
3. Check PDF rendering
4. Validate HTML structure
5. Test responsive design
6. Verify print layout

### Security
- Keep Jekyll up to date
- Review GitHub security alerts
- Update dependencies regularly

## 📚 Additional Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Liquid Template Guide](https://shopify.github.io/liquid/)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [Puppeteer Documentation](https://pptr.dev/)

## 📄 License

This project is open-source and available under the MIT License.
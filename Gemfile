source "https://rubygems.org"

gem "jekyll", "~> 4.4.1"
gem "webrick", "~> 1.8"
gem "sass-embedded", "~> 1.63"

group :jekyll_plugins do
  gem "jekyll-sass-converter", "~> 3.0"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "faraday-retry", "~> 2.2"
end

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'

gem 'bootsnap', '>= 1.2.0', require: false
gem 'mini_magick', '~> 4.8'
gem 'pg', '>= 0.18'
gem 'puma', '~> 3.11'
gem 'rails', '~> 5.2.1'

gem 'acts_as_api'
gem 'aws-sdk-s3', require: false
gem 'bcrypt', '~> 3.1.7'
gem 'consul'
gem 'devise'
gem 'devise-i18n'
gem 'devise-jwt', '~> 0.5.6'
gem 'email_validator'
gem 'enumerize'
gem 'jwt'
gem 'kaminari'
gem 'rack-attack'
gem 'rack-cors', require: 'rack/cors'
gem 'ransack'
gem 'redis', '~> 4.0'
gem 'sass-rails', '~> 5.0'
gem 'sidekiq'
gem 'smart_error'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'

group :development do
  gem 'annotate'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'overcommit', require: false
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :development, :test do
  gem 'bullet'
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'foreman', require: false
  gem 'letter_opener'
  gem 'pry-rails'
  gem 'rails-erd'
  gem 'rubocop', require: false
end

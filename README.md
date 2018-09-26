# Outfit Styler :necktie:

Simple outfit matcher built with Rails API + Webpacker + React JS

The application allow users to upload items and create an outfit with them, and recommend another outfits and items from other users that might fit the profile of an item seleced by the user.

[The Demo](https://outfit-matcher.herokuapp.com)

## Key Features:
- Rails API & ReactJs with Webpacker
- Devise JWT
- Active Storage + S3 + Base64 for Uploading
- Simple Recommendation class

not mutch :sweat_smile:, just simple app

## Setup Requirements

To run this project in local development, you need:

- Ruby 2.5.1
- NPM and Yarn
- PostgreSQL
- Redis

Then clone the repo and run: `bin/setup`

The command will install the dependencies, setup and migrate the database for you.

## Run

To run the application locally, either by using forman to run the API, Webpack and Sidekiq

```foreman start -f Procfile.dev```

or you can run them individually by:

```
# rails backend
rails s

# webpack for react
yarn start
# OR
bin/webpack-dev-server

#Sidekiq
sidekiq
```

# Credits
- [T-Shirt-icon](http://www.iconarchive.com/show/outline-icons-by-iconsmind/T-Shirt-icon.html) for favicon
- [Tabler UI](https://tabler.github.io)
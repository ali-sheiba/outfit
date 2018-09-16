const { environment } = require('@rails/webpacker');

environment.loaders.prepend('eslint', {
  enforce: 'pre',
  test: /\.(js|jsx)$/i,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    failOnError: environment.NODE_ENV !== 'production',
  },
});

module.exports = environment;

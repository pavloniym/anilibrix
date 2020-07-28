// Webpack
const webpack = require('webpack');

// Plugins
const DotEnvPlugin = require('dotenv-webpack');

// Utils
const path = require('path');

// Resolve path
// Starting from root by default
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  plugins: [

    // .env plugin
    new DotEnvPlugin({silent: true, systemvars: true, allowEmptyValues: true}),

    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),


    // Set IS WEB process env variable
    // This is relevant only to web build (via default vue-cli webpack settings)
    new webpack.DefinePlugin({'process.env.IS_WEB': 'true'})

  ],
  resolve: {
    alias: {
      '@': resolve('src'),
      '@store': resolve('src/store'),
      '@views': resolve('src/views'),
      '@utils': resolve('src/utils'),
      '@mixins': resolve('src/mixins'),
      '@router': resolve('src/router'),
      '@assets': resolve('src/assets'),
      '@package': resolve('package.json'),
      '@plugins': resolve('src/plugins'),
      '@layouts': resolve('src/layouts'),
      '@proxies': resolve('src/proxies'),
      '@components': resolve('src/components'),
      '@transformers': resolve('src/transformers'),
    },
  },
};

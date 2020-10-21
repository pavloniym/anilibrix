// Import custom configs
const pwaConfig = require('./pwa.config');
const webpackConfig = require('./webpack.config');
const desktopConfig = require('./desktop.config');

module.exports = {
  pwa: pwaConfig,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
    },
    torrents: {
      entry: 'src/torrents.js',
      template: 'public/torrents.html',
    },
  },
  lintOnSave: false,
  publicPath: process.env.PUBLIC_PATH || '/',
  pluginOptions: {...desktopConfig},
  configureWebpack: webpackConfig,
};

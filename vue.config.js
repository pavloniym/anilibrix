// Import custom configs
const pwaConfig = require('./pwa.config');
const webpackConfig = require('./webpack.config');
const desktopConfig = require('./desktop.config');

module.exports = {
  pwa: {...pwaConfig},
  pages: {
    index: 'src/main.js',
    torrents: 'src/torrents.js'
  },
  lintOnSave: false,
  pluginOptions: {...desktopConfig},
  configureWebpack: {...webpackConfig},
};

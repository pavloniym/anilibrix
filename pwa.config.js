const {name} = require('./package');

module.exports = {
  name,
  themeColor: '#b32121',
  msTileColor: '#b32121',
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
    importWorkboxFrom: 'local',
    include: [/\.html/, /\.js/, /\.css/, /\.json/, /\.jpg/, /\.png/],
    navigateFallback: 'index.html',
    cleanupOutdatedCaches: true,
  },
  workboxPluginMode: 'GenerateSW',
  appleMobileWebAppCapable: 'yes',
};

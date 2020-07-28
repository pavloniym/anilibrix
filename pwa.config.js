module.exports = {
  workboxPluginMode: 'GenerateSW',
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
    importWorkboxFrom: 'local',
    include: [/\.html/, /\.js/, /\.css/, /\.json/, /\.jpg/, /\.png/],
    navigateFallback: 'index.html',
    cleanupOutdatedCaches: true,
  },
  appleMobileWebAppCapable: 'yes',
};

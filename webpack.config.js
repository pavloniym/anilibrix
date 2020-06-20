const path = require('path');

// Resolve path
// Starting from root by default
const resolve = function (dir) {
  return path.join(__dirname, dir);
};

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
      '@main': resolve('src/main'),
      '@package': resolve('package.json'),
      '@router': resolve('src/renderer/router'),
      '@store': resolve('src/renderer/store'),
      '@plugins': resolve('src/renderer/plugins'),
      '@views': resolve('src/renderer/views'),
      '@components': resolve('src/renderer/components'),
      '@assets': resolve('src/renderer/assets'),
      '@transformers': resolve('src/renderer/transformers'),
      '@transformer': resolve('src/renderer/transformers/Transformer'),
      '@layouts': resolve('src/renderer/layouts'),
      '@proxies': resolve('src/renderer/proxies'),
      '@proxy': resolve('src/renderer/proxies/Proxy'),
      '@utils': resolve('src/renderer/utils'),
      '@mixins': resolve('src/renderer/mixins'),
    },
  },
};

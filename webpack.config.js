// Use only for autocompletion in IDE
module.exports = {
    resolve: {
        alias: {
            '@': __dirname + '/packages/renderer/src',
            '@utils': __dirname + '/packages/renderer/src/utils',
            '@views': __dirname + '/packages/renderer/src/views',
            '@store': __dirname + '/packages/renderer/src/store',
            '@mixins': __dirname + '/packages/renderer/src/mixins',
            '@router': __dirname + '/packages/renderer/src/router',
            '@assets': __dirname + '/packages/renderer/src/assets',
            '@package': __dirname + '/package.json',
            '@plugins': __dirname + '/packages/renderer/src/plugins',
            '@layouts': __dirname + '/packages/renderer/src/layouts',
            '@proxies': __dirname + '/packages/renderer/src/proxies',
            '@components': __dirname + '/packages/renderer/src/components',
            '@transformers': __dirname + '/packages/renderer/src/transformers',
        }
    }
};

/* eslint-env node */

import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify'

import {join} from 'path';

//import {renderer} from 'unplugin-auto-expose';

const SRC_ROOT = __dirname + '/src'
const PACKAGE_ROOT = __dirname;
const CHROME_VERSION = 106;

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
    mode: process.env.MODE,
    root: PACKAGE_ROOT,
    resolve: {
        alias: {
            '@': join(SRC_ROOT),
            '@store': join(SRC_ROOT, 'store'),
            '@views': join(SRC_ROOT, 'views'),
            '@utils': join(SRC_ROOT, 'utils'),
            '@mixins': join(SRC_ROOT, 'mixins'),
            '@assets': join(SRC_ROOT, 'assets'),
            '@router': join(SRC_ROOT, 'router'),
            '@plugins': join(SRC_ROOT, 'plugins'),
            '@layouts': join(SRC_ROOT, 'layouts'),
            '@package': join(PACKAGE_ROOT, 'package.json'),
            '@proxies': join(SRC_ROOT, 'proxies'),
            '@components': join(SRC_ROOT, 'components'),
            '@transformers': join(SRC_ROOT, 'transformers'),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    base: '',
    server: {
        fs: {
            strict: true,
        },
    },
    build: {
        sourcemap: true,
        target: `chrome${CHROME_VERSION}`,
        outDir: 'dist',
        assetsDir: '.',
        rollupOptions: {
            input: join(PACKAGE_ROOT, 'index.html'),
        },
        emptyOutDir: true,
        reportCompressedSize: false,
    },
    plugins: [
        vue(),
        vuetify(),
        /*renderer.vite({
            preloadEntry: join(PACKAGE_ROOT, '../preload/src/index.ts'),
        }),*/
    ],
};

export default config;

import {join} from 'path';

const NODE_VERSION = '14';
const PACKAGE_ROOT = __dirname;

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
    mode: process.env.MODE,
    root: PACKAGE_ROOT,
    envDir: process.cwd(),
    resolve: {
        alias: {
            '/@/': join(PACKAGE_ROOT, 'src') + '/',
        },
    },
    build: {
        ssr: true,
        sourcemap: 'inline',
        target: `node${NODE_VERSION}`,
        outDir: 'dist',
        assetsDir: '.',
        minify: process.env.MODE !== 'development',
        lib: {
            entry: 'src/index.js',
            formats: ['cjs'],
        },
        rollupOptions: {
            output: {
                entryFileNames: '[name].cjs',
            },
        },
        emptyOutDir: true,
        reportCompressedSize: false,
    },
};

export default config;

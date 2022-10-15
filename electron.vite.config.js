import {join} from 'path'
import {defineConfig, bytecodePlugin} from 'electron-vite'

// Plugins
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify'

// Routes
const resolveRoot = (path) => join(__dirname, ...path);
const resolveMain = (path) => join(__dirname, 'src', 'main', ...path);
const resolvePreload = (path) => join(__dirname, 'src', 'preload', ...path);
const resolveRenderer = (path) => join(__dirname, 'src', 'renderer', 'src', ...path);


export default defineConfig({
    main: {
        plugins: [
            bytecodePlugin()
        ]
    },
    preload: {
        resolve: {
            alias: {
                '@handlers': resolveMain(['handlers'])
            }
        },
        plugins: [
            bytecodePlugin()
        ]
    },
    renderer: {
        resolve: {
            alias: {
                '@': resolveRenderer([]),
                '@utils': resolveRenderer(['utils']),
                '@views': resolveRenderer(['views']),
                '@store': resolveRenderer(['store']),
                '@mixins': resolveRenderer(['mixins']),
                '@router': resolveRenderer(['router']),
                '@assets': resolveRenderer(['assets']),
                '@package': resolveRoot(['package.json']),
                '@plugins': resolveRenderer(['plugins']),
                '@layouts': resolveRenderer(['layouts']),
                '@proxies': resolveRenderer(['proxies']),
                '@preload': resolvePreload(['index.js']),
                '@components': resolveRenderer(['components']),
                '@composables': resolveRenderer(['composables']),
                '@transformers': resolveRenderer(['transformers']),
            },
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        },
        plugins: [
            vue(),
            vuetify()
        ],
    }
})

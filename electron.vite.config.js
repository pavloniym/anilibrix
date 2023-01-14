import {fileURLToPath, URL} from "url";
import {defineConfig, bytecodePlugin, externalizeDepsPlugin} from 'electron-vite'

// Plugins
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify'

// Routes
const resolveRoot = (path) => fileURLToPath(new URL([...path].join('/'), import.meta.url));
const resolveMain = (path) => fileURLToPath(new URL(['src', 'main', ...path].join('/'), import.meta.url));
const resolveRenderer = (path) => fileURLToPath(new URL(['src', 'renderer', 'src', ...path].join('/'), import.meta.url));


export default defineConfig({
    main: {
        plugins: [
            bytecodePlugin(),
            externalizeDepsPlugin(),
        ]
    },
    preload: {
        resolve: {
            alias: {
                '@main': resolveMain([]),
            }
        },
        plugins: [
            bytecodePlugin(),
            externalizeDepsPlugin(),
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
                '@components': resolveRenderer(['components']),
                '@composables': resolveRenderer(['composables']),
                '@transformers': resolveRenderer(['transformers']),
            },
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        },
        plugins: [
            vue(),
            vuetify(),
        ],
    }
})

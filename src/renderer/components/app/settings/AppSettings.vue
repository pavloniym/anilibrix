<template>
    <v-navigation-drawer v-model="drawer" app right fixed temporary width="400" class="settings">

        <!-- System bar offset -->
        <system-bar-placeholder fixed/>

        <!-- Header -->
        <v-toolbar flat class="shrink" color="#363636" :class="{'mt-9': !this.isMacOnFullscreen}">
            <v-toolbar-title class="body-1">Настройки приложения</v-toolbar-title>
        </v-toolbar>
        <v-divider/>

        <!-- Search -->
        <search v-model="search" class="ma-2" />

        <!-- Sections -->
        <template v-for="(section, k) in sections">
            <component v-bind="{search}" class="mb-4" :is="section" :key="k"/>
        </template>

        <!-- Credentials -->
        <credentials/>

    </v-navigation-drawer>
</template>

<script>

    // App Components
    import SystemBarPlaceholder from './../systembar/placeholder'

    // Components
    import Search from './_components/search/SettingsSearch'
    import Credentials from './_components/credentials/SettingsCredentials'

    // Sections
    import App from './sections/app/SettingsApp'
    // import Player from './sections/player/SettingsPlayer'
    import System from './sections/system/SettingsSystem'
    import Actions from './sections/actions/SettingsActions'
    import Devtools from './sections/devtools/SettingsDevtools'


    // Mixins
    import {AppPlatformMixin} from '@mixins/app'

    // Store
    import {mapState, mapActions} from 'vuex'

    export default {
        mixins: [
            AppPlatformMixin
        ],
        components: {
            Search,
            Credentials,
            SystemBarPlaceholder
        },
        data() {
            return {
                search: null,
            }
        },
        computed: {
            ...mapState('app', {_drawer: s => s.drawer}),


            /**
             * Get sections
             *
             * @return Array
             */
            sections() {
                return [
                    //  Player,
                    System,
                    Actions,
                    App,
                    Devtools,
                ]
            },

            drawer: {

                /**
                 * Get drawer state
                 *
                 * @return boolean
                 */
                get() {
                    return !!this._drawer;
                },

                /**
                 * Set drawer state
                 *
                 * @param state
                 * @return void
                 */
                set(state) {
                    this._setDrawer(state);
                }
            }

        },

        methods: {
            ...mapActions('app', {_setDrawer: 'setDrawer'}),
        }

    }
</script>

<style lang="scss" scoped>
    .settings {

        ::v-deep {
            .v-navigation-drawer__content {

                // @see: https://github.com/buefy/buefy/issues/2096
                // @see: https://stackoverflow.com/questions/14677490/blurry-text-after-using-css-transform-scale-in-chrome
                transform: translateZ(0) !important;
                overflow-y: scroll;
                backface-visibility: hidden !important;
            }
        }

        ::-webkit-scrollbar-thumb {
            background-color: black;
        }

        ::-webkit-scrollbar {
            background-color: transparent;
        }
    }

</style>

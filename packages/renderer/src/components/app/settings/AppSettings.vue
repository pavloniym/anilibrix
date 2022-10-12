<template>
    <v-navigation-drawer
        app
        right
        fixed
        width="400"
        class="settings"
        :model-value="true"
        @input="toggleSettingsVisibility">

        <!-- System bar offset -->
<!--        <system-bar-placeholder fixed/>-->

        <!-- Header -->
        <v-toolbar flat class="shrink" color="#363636" :class="{'mt-9': !this.isMacOnFullscreen}">
            <v-toolbar-title class="body-1">Настройки приложения</v-toolbar-title>
        </v-toolbar>
        <v-divider/>

        <!-- Search -->
<!--        <search class="ma-2"/>-->

        <!-- Sections -->
        <template v-for="(section, k) in sections" >
            <component class="mb-4" :key="k" :is="section"/>
        </template>

        <!-- Credentials -->
<!--        <credentials/>-->

    </v-navigation-drawer>
</template>

<script>

    // App Components
   // import SystemBarPlaceholder from '../systembar/placeholder/AppSystemBarPlaceholder.vue'

    // Components
 //   import Search from './_components/search/SettingsSearch.vue'
//    import Credentials from './_components/credentials/SettingsCredentials.vue'

    // Sections
  //  import App from './sections/app/AppSettings.vue'
  //  import Player from './sections/player/PlayerSettings.vue'
  //  import System from './sections/system/SystemSettings.vue'
  //  import Actions from './sections/actions/ActionsSettings.vue'
  //  import Devtools from './sections/devtools/DevtoolSettings.vue'

    // Mixins
    import {AppPlatformMixin} from '@mixins/app'

    // Store
   // import {mapActions, mapState} from "vuex";
    //import {SET_SETTINGS_ARE_VISIBLE_ACTION} from "@/renderer/src/store/app/settings/appSettingsStore";

    export default {
        mixins: [
            AppPlatformMixin
        ],
        components: {
       //     Search,
        //    Credentials,
       //     SystemBarPlaceholder
        },
        computed: {
           // ...mapState('app/settings', {_settingsAreVisible: s => s.settingsAreVisible}),

            /**
             * Get sections
             *
             * @return Array
             */
            sections() {
                return [
                   // Player,
                   // System,
                   // Actions,
                  //  App,
                  //  Devtools,
                ]
            }
        },

        methods: {
           // ...mapActions('app/settings', [SET_SETTINGS_ARE_VISIBLE_ACTION]),

            /**
             * Toggle settings visibility
             *
             * @param settingsAreVisible
             * @return {void}
             */
            toggleSettingsVisibility(settingsAreVisible) {
                this[SET_SETTINGS_ARE_VISIBLE_ACTION](settingsAreVisible);
            }
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

<template>
    <v-navigation-drawer v-bind="options" v-model="settings.settingsAreVisible" class="settings pt-10">

        <!-- Search -->
        <search class="mx-2 mt-4"/>

        <!-- Sections -->
        <template v-for="(section, k) in sections" :key="k">
            <component :is="section" :class="{'mt-4': k > 0}"/>
        </template>

        <!-- Credentials -->
        <credentials/>

    </v-navigation-drawer>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Composables
    import {useSettingsStore} from "@store/settings/settingsStore";

    // Components
    import Search from './_components/search/SettingsSearch'
    import Credentials from './_components/credentials/SettingsCredentials'

    // Sections
    import App from './_sections/app/AppSettings'
    import Player from './_sections/player/PlayerSettings'
    import System from './_sections/system/SystemSettings'
    import Actions from './_sections/actions/ActionsSettings'
    import Devtools from './_sections/devtools/DevtoolSettings'

    // Bindings
    const settings = useSettingsStore();

    // Computed
    const options = computed(() => ({
        width: 400,
        color: 'grey bg-grey-darken-3',
        location: 'right',
        temporary: true,
        disableRouteWatcher: true,
        disableResizeWatcher: true,
    }))

    // Computed
    const sections = computed(() =>
        [
            Player,
            System,
            Actions,
            App,
            Devtools,
        ]
    );

</script>

<style lang="scss">


    .v-navigation-drawer__content {

        // @see: https://github.com/buefy/buefy/issues/2096
        // @see: https://stackoverflow.com/questions/14677490/blurry-text-after-using-css-transform-scale-in-chrome
        transform: translateZ(0) !important;
        overflow-y: scroll;
        backface-visibility: hidden !important;


        &::-webkit-scrollbar-thumb {
            background-color: black;
        }

        &::-webkit-scrollbar {
            background-color: transparent;
        }

    }

</style>

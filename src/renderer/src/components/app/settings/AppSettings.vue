<template>
    <v-navigation-drawer
        v-model="appSettings.settingsAreVisible"
        width="400"
        class="settings pt-10"
        color="grey bg-grey-darken-3"
        location="right">

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

    // Store
    import {useAppSettingsStore} from "@store/app/settings/appSettingsStore";

    // Store
    const appSettings = useAppSettingsStore();

    // Components
    import Search from './_components/search/SettingsSearch'
    import Credentials from './_components/credentials/SettingsCredentials'

    // Sections
    import App from './sections/app/AppSettings'
    import Player from './sections/player/PlayerSettings'
    import System from './sections/system/SystemSettings'
    import Actions from './sections/actions/ActionsSettings'
    import Devtools from './sections/devtools/DevtoolSettings'

    // Computed
    const sections = computed(() => [
        Player,
        System,
        Actions,
        App,
        Devtools,
    ]);

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

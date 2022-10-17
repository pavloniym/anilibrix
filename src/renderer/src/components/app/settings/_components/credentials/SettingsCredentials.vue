<template>
    <v-card flat color="transparent" class="mt-auto py-3 credentials__data">
        <v-card-text class="fz-.70 text-line-height-1.3 text-grey text-h6">

            <!-- Version -->
            <!-- About -->
            <v-layout class="align-center">
                <div>Версия {{ appVersion }}</div>
                <v-icon icon="mdi-circle" size="4" class="mx-2"/>
                <a href="#" @click.prevent="showAbout">О приложении</a>
            </v-layout>

            <!-- Devtools -->
            <!-- Disclaimer -->
            <div class="fz-.60">

                <!-- Disclaimer -->
                <div class="py-1">
                    Весь материал в приложении представлен исключительно для домашнего ознакомительного просмотра.
                </div>

                <!-- Devtools -->
                <div>
                    <a href="#" @click.prevent="toggleDevtools">
                        Инструменты отладки
                    </a>
                </div>
            </div>

        </v-card-text>
    </v-card>
</template>

<script setup>

    // Utils
    import app from '@package'

    // Store
    import {useSettingsStore} from "@store/settings/settingsStore";

    // Store
    const settings = useSettingsStore();


    const showAbout = () => window.electron.showAppAbout();
    const appVersion = app?.version;
    const toggleDevtools = () => settings.showDevtools = !settings.showDevtools;

</script>


<style lang="scss" scoped>

    a {
        color: inherit;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

</style>


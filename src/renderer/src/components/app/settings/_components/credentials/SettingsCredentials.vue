<template>
    <v-card flat color="transparent" class="mt-auto py-3 credentials__data">
        <v-card-text class="caption">
            <v-layout class="with-divider">
                <div>Версия {{ app.version }}</div>
                <a href="#" @click.prevent="showAbout">О приложении</a>
            </v-layout>
            <div>Весь материал в приложении представлен исключительно для домашнего ознакомительного просмотра.</div>
            <div><a href="#" @click.prevent="showDevtools">Инструменты отладки</a></div>
        </v-card-text>
    </v-card>
</template>

<script>

    // Utils
    import app from '@package'

    // Store
    import {mapState, mapActions} from 'vuex'
    import {SET_SHOW_DEVTOOLS_ACTION} from "@/renderer/src/store/app/settings/appSettingsStore";

    // Utils
    import {sendAppAboutEvent} from "@main/handlers/app/appHandlers";

    export default {
        computed: {
            ...mapState('app/settings', {_showDevtools: s => s.showDevtools}),

            /**
             * Get application data
             *
             * @return object
             */
            app() {
                return {
                    version: app?.version,
                }
            },
        },

        methods: {
            ...mapActions('app/settings', [SET_SHOW_DEVTOOLS_ACTION]),

            /**
             * Show about panel
             *
             * @return void
             */
            showAbout() {
                sendAppAboutEvent();
            },


            /**
             * Show devtools
             *
             * @return void
             */
            showDevtools() {
                this[SET_SHOW_DEVTOOLS_ACTION](!this._showDevtools);
            }


        }
    }
</script>


<style lang="scss" scoped>

    .credentials {
        &__data {

            a {
                color: inherit;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }

            .with-divider {
                > * {
                    &::after {
                        content: "-";
                        display: inline-block;
                        padding: 0 3px;
                        text-decoration: none;
                    }

                    &:last-child {
                        &::after {
                            content: none;
                        }
                    }
                }
            }
        }
    }

</style>


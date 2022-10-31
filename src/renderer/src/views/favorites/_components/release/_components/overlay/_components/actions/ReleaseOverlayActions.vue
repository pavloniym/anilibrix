<template>
    <v-layout align-end>
        <template v-for="(action, k) in actions">
            <button-with-icon v-bind="action" class="fz-.80" :key="k"/>
        </template>
    </v-layout>
</template>

<script>

    // App Components
    import {ButtonWithIcon} from '@components/interface/buttons'

    // Routes
    import {WATCH_EPISODE_ROUTE} from '@router/watch/episode/watchEpisodeRoutes'


    const props = {
        release: {
            type: Object,
            default: null
        }
    }

    export default {
        components: {
            ButtonWithIcon
        },
        props,
        computed: {

            /**
             * Get release actions
             *
             * @return {*}
             */
            actions() {
                return [
                    {
                        to: this.toWatchEpisodeRoute,
                        icon: 'mdi-play',
                        label: 'Смотреть',
                        iconSize: 20,
                        isVisible: this.release?.latestEpisode !== null,
                    },
                ].filter(action => action.isVisible === true)
            },


            /**
             * Get watch latest episode route
             *
             * @returns {*}
             */
            toWatchEpisodeRoute() {
                return {
                    name: WATCH_EPISODE_ROUTE,
                    params: {
                        releaseAlias: this.release?.alias,
                        episodeOrdinal: this.release?.latestEpisode?.ordinal,
                    }
                }
            }


        },
    }
</script>


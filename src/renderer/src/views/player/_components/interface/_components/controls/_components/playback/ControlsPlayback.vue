<template>
    <div class="d-flex justify-center align-center h-100">
        <template v-for="button in buttons">
            <v-btn v-on="{...button.events}" v-bind="button.props">
                <v-icon v-bind="button.icon"/>
                <v-tooltip v-if="button?.tooltip?.title" v-bind="button.tooltip" activator="parent">
                    <div class="fz-.75 text-line-height-1.1 font-weight-bold">{{ button?.tooltip?.title }}</div>
                    <div class="fz-.60 text-line-height-1.1">{{ button?.tooltip?.subtitle }}</div>
                </v-tooltip>
            </v-btn>
        </template>
    </div>
</template>

<script setup>


    // Vue
    import {computed, inject} from "vue";

    // Composables
    import {useRouter} from "vue-router";

    // Route
    import {PLAYER_ROUTE} from "@router/player/playerRoutes";

    // Bindings
    const router = useRouter();

    // Inject
    const player = inject('player');
    const release = inject('release');
    const isPlaying = inject('isPlaying');
    const currentEpisode = inject('episode');
    const isLoadedMetadata = inject('isLoadedMetadata');

    // Computed
    const episodes = computed(() => release?.value?.episodes || []);
    const currentEpisodeOrdinal = computed(() => currentEpisode?.value?.ordinal || 0);

    // Current and next episodes
    const nextEpisode = computed(() => (episodes?.value || []).find(item => item?.ordinal === currentEpisodeOrdinal?.value + 1) || null);
    const previousEpisode = computed(() => (episodes?.value || []).find(item => item?.ordinal === currentEpisodeOrdinal?.value - 1) || null);

    // Computed
    const buttons = computed(() => [
        {
            icon: {icon: 'mdi-skip-previous', size: 16},
            props: {flat: true, icon: true, disabled: previousEpisode?.value === null, width: 30, height: 30},
            tooltip: {title: previousEpisode?.value?.title, location: 'start', subtitle: release?.value?.name},
            events: {
                click: async () => await router.push({
                    name: PLAYER_ROUTE,
                    params: {releaseId: release?.value?.id, episodeId: previousEpisode?.value?.id}
                })
            }
        },
        {
            icon: {icon: isPlaying?.value ? 'mdi-pause' : 'mdi-play', size: 20},
            props: {flat: true, icon: true, class: ['mx-1'], width: 45, height: 45, disabled: isLoadedMetadata?.value !== true},
            events: {click: () => player?.value?.togglePlay()}
        },
        {
            icon: {icon: 'mdi-skip-next', size: 16},
            props: {flat: true, icon: true, disabled: nextEpisode?.value === null, width: 30, height: 30},
            events: {
                click: async () => await router.push({
                    name: PLAYER_ROUTE,
                    params: {releaseId: release?.value?.id, episodeId: nextEpisode?.value?.id}
                })
            },
            tooltip: {title: nextEpisode?.value?.title, location: 'end', subtitle: release?.value?.name}
        },
    ])


</script>

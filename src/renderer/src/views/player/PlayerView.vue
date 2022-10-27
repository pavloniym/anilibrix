<template>
    <player-video
        v-if="src"
        v-bind="{src, poster, startPosition}"
        :key="src"
        @dblclick.native.prevent="toggleFullscreen"
        @update:currentTime="startPosition = $event">
        <player-interface/>
    </player-video>
</template>

<script setup>

    // Props
    const props = defineProps({
        releaseId: {default: null},
        episodeId: {default: null},
    })

    // Vue
    import {computed, provide, ref, watch} from "vue";

    // Components
    import PlayerVideo from './_components/video/PlayerVideo'
    import PlayerInterface from './_components/interface/PlayerInterface'

    // Proxy + Transformer
    import ReleasesProxy from "@proxies/releases/ReleasesProxy";
    import ReleasesTransformer from "@transformers/releases/ReleasesTransformer";

    // Composables
    import {useRoute} from 'vue-router'
    import {useSettingsStore} from "@store/settings/settingsStore";
    import {useFullscreenWindow} from '@composables/app/fullscreen/appFullscreen'

    // Bindings
    const route = useRoute();
    const settings = useSettingsStore();
    const fullscreen = useFullscreenWindow();

    // State
    const release = ref(null);
    const episode = ref(null);
    const startPosition = ref(0);

    // Computed
    const qualities = computed(() =>
        [
            {label: '480p', type: '480', key: 'q480', isAvailable: !!episode?.value?.q480},
            {label: '720p', type: '720', key: 'q720', isAvailable: !!episode?.value?.q720},
            {label: '1080p', type: '1080', key: 'q1080', isAvailable: !!episode?.value?.q1080},
        ]
            .filter(q => q?.isAvailable === true)
    );

    // Computed
    const src = computed(() => episode?.value?.[quality?.value?.key]);
    const poster = computed(() => settings.applyToConnectionHost(episode?.value?.poster));
    const quality = computed(() => qualities?.value?.find(q => q?.type === settings?.playerQuality) || qualities?.value?.[0])

    // Methods
    const toggleFullscreen = () => fullscreen.toggleFullscreen();

    // Provide
    provide('release', release);
    provide('episode', episode);
    provide('quality', quality);
    provide('qualities', qualities);

    // Watch
    watch(
        route,
        async (to) => {

            // Make request to fetch release from server
            const response = await new ReleasesProxy().fetchReleaseById({releaseId: to?.params?.releaseId});

            // Set release
            // Set episode
            release.value = ReleasesTransformer.fetchRelease(response?.data);
            episode.value = (release?.value?.episodes || []).find(episode => episode?.id === to?.params?.episodeId);

            // Reset start position
            startPosition.value = 0;

        },
        {immediate: true}
    )

</script>

<template>
    <player-video v-if="src" v-bind="{src}">
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

    // Proxy + Transformer
    import ReleasesProxy from "@proxies/releases/ReleasesProxy";
    import ReleasesTransformer from "@transformers/releases/ReleasesTransformer";

    // Composables
    import {useRoute} from 'vue-router'

    // Components
    import PlayerVideo from './_components/video/PlayerVideo'
    import PlayerInterface from './_components/interface/PlayerInterface'

    // Bindings
    const route = useRoute();

    // State
    const release = ref(null);
    const episode = ref(null);

    // Computed
    const src = computed(() => episode?.value?.q480);

    // Provide release + episode
    provide('release', release);
    provide('episode', episode);

    // Watch
    watch(
        () => route,
        async (to) => {
            const response = await new ReleasesProxy().fetchReleaseById({releaseId: to?.params?.releaseId});

            release.value = ReleasesTransformer.fetchRelease(response?.data);
            episode.value = (release?.value?.episodes || []).find(episode => episode?.id === to?.params?.episodeId);
        },
        {immediate: true}
    )

</script>

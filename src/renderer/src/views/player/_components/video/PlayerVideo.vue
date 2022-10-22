<template>
    <v-layout class="h-100 bg-black f-flex flex-column justify-center">
        <slot name="prepend"/>
        <video ref="container" muted playsinline controls preload="auto" crossorigin="anonymous"/>
        <slot/>
    </v-layout>
</template>

<script setup>

    // Props
    const props = defineProps({
        src: {type: String, default: null},
        startPosition: {type: Number, default: null}
    })

    // Vue
    import {inject, ref, onMounted, onDeactivated, provide} from "vue";

    // State
    const hls = ref(null);
    const player = ref(null);
    const options = ref({
        debug: import.meta.env.DEV === true,
        autoplay: false,
        controls: false,
        keyboard: {global: false, focused: false},
        resetOnEnd: false,
        fullscreen: {enabled: false},
        clickToPlay: true,
    });
    const duration = ref(null);
    const container = ref(null);
    const isPlaying = ref(false);
    const currentTime = ref(null);
    const isLoadedMetadata = ref(false);
    const isVisibleInterface = ref(false);


    // Provide
    provide('player', player);
    provide('duration', duration);
    provide('isPlaying', isPlaying);
    provide('currentTime', currentTime);
    provide('isLoadedMetadata', isLoadedMetadata);
    provide('isVisibleInterface', isVisibleInterface);


    // Mounted
    onMounted(() => {

        // Inject Plyr instance
        // Inject HLS instance
        // @see https://github.com/sampotts/plyr
        // @see https://github.com/video-dev/hls.js/
        const HLS = inject('$hls');
        const Plyr = inject('$plyr');

        // Create player
        player.value = new Plyr(container?.value, options?.value);

        // Get duration on initial start
        // Update current player position on time update
        player?.value?.on('timeupdate', _ => currentTime.value = player?.value?.currentTime);
        player?.value?.on('loadedmetadata', _ => isLoadedMetadata.value = true);
        player?.value?.on('loadedmetadata', e => duration.value = e?.detail?.plyr?.duration);

        // Catch player interface visibility
        player?.value?.on('controlsshown', _ => isVisibleInterface.value = true);
        player?.value?.on('controlshidden', _ => isVisibleInterface.value = false);

        // Set is playing state
        player?.value?.on('play', _ => isPlaying.value = true);
        player?.value?.on('pause', _ => isPlaying.value = false);

        // Create HLS instance
        hls.value = new HLS({startPosition: props.startPosition || 0});

        // Attach HLS to media element
        hls?.value?.attachMedia(player?.value?.media);

        // When hls instance attached -> load source payload
        hls?.value?.on(HLS.Events.MEDIA_ATTACHED, () => hls?.value?.loadSource(props?.src));
        hls?.value?.on(HLS.Events.MANIFEST_LOADED, () => player?.value?.play());

    });


    onDeactivated(() => {
        player?.value?.pause();
        player?.value?.destroy();
        player.value.media.src = '';
    })

</script>

<template>
    <v-layout class="h-100 bg-black f-flex flex-column justify-center">

        <!-- Slot:prepend -->
        <slot name="prepend"/>

        <!-- Plyr instance -->
        <!-- Video container -->
        <video ref="container" muted playsinline controls preload="auto" crossorigin="anonymous"/>


        <!-- Slot:append -->
        <slot name="append"/>

    </v-layout>
</template>

<script setup>

    // Props
    const props = defineProps({
        src: {type: String, default: null},
        startPosition: {type: Number, default: null}
    })

    // Vue
    import {inject, ref, onMounted, reactive, onDeactivated} from "vue";

    // Plyr
    const hls = ref(null);
    const player = ref(null);
    const options = reactive({
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
    const currentTime = ref(null);


    // Mounted
    onMounted(() => {

        // Inject Plyr instance
        // @see https://github.com/sampotts/plyr
        const Plyr = inject('$plyr');

        // Create player
        player.value = new Plyr(container?.value, options?.value);

        // Get duration on initial start
        // Update current player position on time update
        player?.value?.on('timeupdate', () => currentTime.value = player?.value?.currentTime);
        player?.value?.on('loadedmetadata', e => duration.value = e?.detail?.plyr?.duration);

        // Inject HLS instance
        // @see https://github.com/video-dev/hls.js/
        const HLS = inject('$hls');

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

<style scoped lang="scss">

</style>

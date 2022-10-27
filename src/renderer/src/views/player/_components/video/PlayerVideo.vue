<template>
    <v-layout class="h-100 bg-black f-flex flex-column justify-center">
        <slot name="prepend"/>
        <video ref="container" muted playsinline controls preload="auto" crossorigin="anonymous"/>
        <slot v-if="isReady"/>
    </v-layout>
</template>

<script setup>

    // Props
    const props = defineProps({
        src: {type: String, default: null},
        poster: {type: String, default: null},
        startPosition: {type: Number, default: null}
    })

    // Emits
    const emits = defineEmits(['update:currentTime']);

    // Vue
    import {inject, ref, onMounted, provide, computed, watch, onUnmounted} from "vue";

    // Composables
    import {useSettingsStore} from "@store/settings/settingsStore";

    // Bindings
    const settings = useSettingsStore();

    // State
    const hls = ref(null);
    const player = ref(null);
    const volume = ref(0);
    const isReady = ref(false);
    const duration = ref(null);
    const container = ref(null);
    const isLoading = ref(true);
    const isPlaying = ref(false);
    const currentTime = ref(null);
    const currentSpeed = ref(null);
    const isLoadedMetadata = ref(false);
    const isVisibleInterface = ref(false);

    // State
    const options = ref({
        debug: import.meta.env.DEV === true,
        poster: props?.poster,
        autoplay: false,
        controls: false,
        keyboard: {global: false, focused: false},
        resetOnEnd: false,
        fullscreen: {enabled: false},
        clickToPlay: true,
    });

    // Computed
    const hlsOptions = computed(() => ({
        startPosition: props.startPosition || -1,
        maxBufferLength: settings?.videoBufferSeconds || 60,
    }));

    // Methods
    const decreaseSpeed = (speedValue) => player?.value?.speed - speedValue > 0 ? player.value.speed = player?.value?.speed - speedValue : null;
    const increaseSpeed = (speedValue) => player?.value?.speed + speedValue <= 2 ? player.value.speed = player?.value?.speed + speedValue : null;

    // Watch
    watch(currentTime, currentTime => emits('update:currentTime', currentTime));

    // Provide
    provide('player', player);
    provide('volume', volume);
    provide('duration', duration);
    provide('isLoading', isLoading);
    provide('isPlaying', isPlaying);
    provide('currentTime', currentTime);
    provide('currentSpeed', currentSpeed);
    provide('increaseSpeed', increaseSpeed);
    provide('decreaseSpeed', decreaseSpeed);
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

        // Set initial volume level
        // Set initial current speed value
        volume.value = player?.value?.muted === true ? 0 : player?.value?.volume;
        currentSpeed.value = player?.value?.speed;

        // Set is ready event
        player?.value?.on('ready', _ => isReady.value = true);

        // Get duration on initial start
        // Update current player position on time update
        // Update PIP video if PIP exists
        player?.value?.on('timeupdate', _ => currentTime.value = player?.value?.currentTime);
        player?.value?.on('loadedmetadata', _ => isLoadedMetadata.value = true);
        player?.value?.on('loadedmetadata', e => duration.value = e?.detail?.plyr?.duration);
        player?.value?.on('loadedmetadata', () => document.pictureInPictureElement ? player.value.pip = true : null);

        // Catch player interface visibility
        player?.value?.on('controlsshown', _ => isVisibleInterface.value = true);
        player?.value?.on('controlshidden', _ => isVisibleInterface.value = false);

        // Set is playing state
        player?.value?.on('play', _ => isPlaying.value = true);
        player?.value?.on('pause', _ => isPlaying.value = false);

        // Track volume level
        // Track playback speed value
        player?.value?.on('ratechange', _ => currentSpeed.value = player?.value?.speed);
        player?.value?.on('volumechange', _ => volume.value = player?.value?.muted === true ? 0 : player?.value?.volume);

        // Detect loading state
        player.value.on('seeking', () => isLoading.value = true);
        player.value.on('waiting', () => isLoading.value = true);
        player.value.on('stalled', () => isLoading.value = true);
        player.value.on('canplay', () => isLoading.value = false);

        // Create HLS instance
        hls.value = new HLS(hlsOptions?.value);

        // Attach HLS to media element
        hls?.value?.attachMedia(player?.value?.media);

        // When hls instance attached -> load source payload
        hls?.value?.on(HLS.Events.MEDIA_ATTACHED, () => hls?.value?.loadSource(props?.src));
        hls?.value?.on(HLS.Events.MANIFEST_LOADED, () => player?.value?.play());

    });

    onUnmounted(() => {
        hls?.value?.destroy();
        player?.value?.pause();
        player?.value?.destroy();
    })


</script>

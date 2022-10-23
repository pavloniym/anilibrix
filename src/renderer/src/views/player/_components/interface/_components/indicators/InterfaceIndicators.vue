<template>
    <div v-if="icon" class="d-flex align-center justify-center indicators" :key="icon">
        <v-btn icon color="rgba(0, 0, 0, 0.30)">
            <v-icon v-bind="{icon}"/>
        </v-btn>
    </div>
</template>

<script setup>

    // Vue
    import {inject, nextTick, onMounted, ref} from "vue";

    // State
    const icon = ref(null);
    const currentTime = ref(null);
    const timeoutHandler = ref(null);

    // Inject
    const player = inject('player');


    /**
     * Show indicator with timeout
     *
     * @param iconValue
     * @return {void}
     */
    const showIndicatorWithTimeout = (iconValue) => {
        clearTimeout(timeoutHandler?.value);
        icon.value = iconValue;
        timeoutHandler.value = setTimeout(() => icon.value = null, 1000)
    };

    onMounted(() => {
        nextTick(() => {
            player?.value?.on('play', () => showIndicatorWithTimeout('mdi-play'));
            player?.value?.on('pause', () => showIndicatorWithTimeout('mdi-pause'));
            player?.value?.on('seeking', () => showIndicatorWithTimeout(currentTime?.value <= player?.value?.currentTime ? 'mdi-fast-forward' : 'mdi-rewind'));
            player?.value?.on('timeupdate', () => currentTime.value = player?.value?.currentTime)
        })
    })


</script>

<style scoped lang="scss">

    .indicators {
        top: 40px;
        left: 0;
        right: 0;
        bottom: 0;
        position: fixed;
        pointer-events: none;

        :deep(.v-btn) {
            opacity: 0;
            animation: playing .65s;

            @keyframes playing {
                from {
                    opacity: 1;
                    transform: scale(1);
                }
                to {
                    opacity: 0;
                    transform: scale(1.7);
                }
            }
        }
    }

</style>

<template>
    <div v-if="icon || content" class="d-flex align-center justify-center indicators" :key="key">
        <v-btn icon color="rgba(0, 0, 0, 0.30)">
            <v-icon v-if="icon" v-bind="{icon}"/>
            <div v-if="content" v-text="content" class="fz-.70 font-weight-bold"/>
        </v-btn>
    </div>
</template>

<script setup>

    // Vue
    import {inject, onMounted, ref} from "vue";

    // State
    const key = ref(null);
    const icon = ref(null);
    const content = ref(null);
    const currentTime = ref(null);
    const timeoutHandler = ref(null);

    // Inject
    const player = inject('player');

    // Methods
    const showIndicatorIcon = (iconValue) => applyAndResetIndicator(() => icon.value = iconValue);

    // Methods
    const applyAndResetIndicator = (callback) => {
        clearTimeout(timeoutHandler?.value);
        key.value = Date.now();
        callback();
        timeoutHandler.value = setTimeout(() => {
            key.value = null;
            icon.value = null;
            content.value = null;
        }, 1000)
    }

    // Mounted
    onMounted(() => {
        player?.value?.on('play', () => showIndicatorIcon('mdi-play'));
        player?.value?.on('pause', () => showIndicatorIcon('mdi-pause'));
        player?.value?.on('seeking', () => showIndicatorIcon(currentTime?.value <= player?.value?.currentTime ? 'mdi-fast-forward' : 'mdi-rewind'));
        player?.value?.on('timeupdate', () => currentTime.value = player?.value?.currentTime);
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

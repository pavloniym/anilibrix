<template>
    <div ref="timeline" class="timeline" @click.self="seekTo">

        <!-- Bar -->
        <!-- Progress -->
        <div class="bar bg-grey rounded">
            <div class="thumb bg-secondary"/>
            <div class="progress bg-secondary"/>
        </div>

        <!-- Slider -->
        <div v-if="!isOutside" class="fz-.70 slider d-flex align-center justify-center bg-secondary rounded">
            <div class=" font-weight-bold">{{ prettySeekingTime }}</div>
        </div>

    </div>
</template>

<script setup>

    // Vue
    import {computed, inject, ref, watch} from "vue";

    // Composables
    import {useMouseInElement} from '@vueuse/core'

    // Utils
    import formatDuration from 'format-duration'

    // Injects
    const player = inject('player');
    const duration = inject('duration')
    const currentTime = inject('currentTime')

    // Refs
    const timeline = ref(null);

    // Bindings
    const {elementX, elementWidth, isOutside} = useMouseInElement(timeline);

    // State
    const time = ref(null);
    const progress = ref(null);

    // Computed
    const seekingTime = computed(() => seekingProgress?.value > 0 ? (duration?.value * (seekingProgress?.value / 100)) : null);
    const seekingProgress = computed(() => elementWidth?.value > 0 ? ((elementX?.value / elementWidth?.value) * 100) : null);
    const prettySeekingTime = computed(() => formatDuration(seekingTime?.value * 1000, {leading: true}))

    // Methods
    const seekTo = () => {
        if (seekingTime?.value) time.value = seekingTime?.value
        if (seekingTime?.value) player.value.currentTime = seekingTime?.value;
    }

    watch(time, () => progress.value = duration?.value > 0 ? (time?.value / duration?.value * 100) : null);
    watch(currentTime, () => time.value = currentTime?.value);


</script>

<style scoped lang="scss">

    .timeline {
        width: 100%;
        height: 30px;
        position: relative;

        .bar {
            top: calc((30px - 2px) / 2);
            left: 0;
            width: 100%;
            height: 6px;
            max-height: 2px;
            position: absolute;
            transition: max-height .2s ease;
            pointer-events: none;

            .thumb {
                top: 50%;
                left: calc(v-bind(progress) * 1%);
                width: 12px;
                height: 12px;
                opacity: 0;
                position: absolute;
                transition: opacity .15s ease;
                margin-top: -6px;
                margin-left: -6px;
                border-radius: 50%;

            }

            .progress {
                top: 0;
                left: 0;
                width: calc(v-bind(progress) * 1%);
                height: 100%;
                z-index: 10;
                position: absolute;
                pointer-events: none;
                border-radius: inherit 0 0 inherit;
            }
        }

        &:hover {
            .bar {
                max-height: 6px;
            }
            .thumb {
                opacity: 1;
            }
        }

        .slider {
            top: -15px;
            left: calc(v-bind(seekingProgress) * 1%);
            width: 40px;
            height: 20px;
            position: absolute;
            margin-left: -20px;
        }
    }

</style>

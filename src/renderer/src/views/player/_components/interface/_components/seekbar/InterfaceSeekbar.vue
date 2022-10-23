<template>
    <div ref="seekbar" class="py-2 seekbar" @click.self="seekTo">
        <!--<preview/>-->
        <position/>
        <timeline>
            <thumb/>
            <progression/>
        </timeline>
    </div>
</template>

<script setup>

    // Vue
    import {computed, inject, provide, ref, watch} from "vue";

    // Composables
    import {useMouseInElement} from '@vueuse/core'

    // Utils
    import formatDuration from 'format-duration'

    // Components
    import Thumb from './_components/thumb/SeekbarThumb'
    //import Preview from './_components/preview/SeekbarPreview'
    import Timeline from './_components/timeline/SeekbarTimeline'
    import Position from './_components/position/SeekbarPosition'
    import Progression from './_components/progression/SeekbarProgression'

    // Injects
    const player = inject('player');
    const duration = inject('duration')
    const currentTime = inject('currentTime')
    const isLoadedMetadata = inject('isLoadedMetadata');

    // Refs
    const seekbar = ref(null);

    // Bindings
    const {elementX, elementWidth, isOutside} = useMouseInElement(seekbar);

    // State
    const time = ref(null);
    const progress = ref(null);

    // Computed
    const isHovered = computed(() => isOutside?.value === false && isLoadedMetadata?.value === true)
    const seekingTime = computed(() => seekingProgress?.value > 0 ? (duration?.value * (seekingProgress?.value / 100)) : null);
    const seekingProgress = computed(() => elementWidth?.value > 0 ? ((elementX?.value / elementWidth?.value) * 100) : null);
    const prettySeekingTime = computed(() => formatDuration(seekingTime?.value * 1000, {leading: true}))

    // Methods
    const seekTo = () => {
        if (seekingTime?.value) time.value = seekingTime?.value
        if (seekingTime?.value) player.value.currentTime = seekingTime?.value;
    }

    // Inject
    watch(time, () => progress.value = duration?.value > 0 ? (time?.value / duration?.value * 100) : null);
    watch(currentTime, () => time.value = currentTime?.value);


    // Provide
    provide('time', time);
    provide('seekbar', seekbar);
    provide('progress', progress);
    provide('isHovered', isHovered)
    provide('seekingTime', seekingTime);
    provide('seekingProgress', seekingProgress);
    provide('prettySeekingTime', prettySeekingTime);


</script>

<style scoped lang="scss">

    .seekbar {
        width: 100%;
        height: 30px;
        position: relative;
    }

</style>

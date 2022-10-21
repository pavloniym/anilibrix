<template>
    <div v-if="isLoadedMetadata && duration && currentTime" class="fz-.75 font-weight-bold">
        {{ prettyTime }} / {{ prettyTotal }}
    </div>
</template>

<script setup>

    // Vue
    import {computed, inject} from "vue";

    // Utils
    import formatDuration from 'format-duration'

    // Injects
    const player = inject('player');
    const duration = inject('duration')
    const currentTime = inject('currentTime')
    const isLoadedMetadata = inject('isLoadedMetadata');

    // Computed
    const prettyTime = computed(() => currentTime?.value >= 0 ? formatDuration(currentTime?.value * 1000, {leading: true}) : null);
    const prettyTotal = computed(() => duration?.value >= 0 ? formatDuration(duration?.value * 1000, {leading: true}) : null);

</script>

<template>
    <div class="d-flex align-start justify-center" :style="{visibility: latestEpisode !== null ? null : 'hidden'}">
        <v-btn v-text="label" variant="text" density="comfortable" class="fz-.75 font-weight-bold text-white episode"/>
    </div>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Utils
    import plural from 'plural-ru'

    // Props
    const props = defineProps({
        release: {type: Object, default: null}
    })

    // Computed
    const label = computed(() => plural(latestEpisode?.value?.ordinal, '%d эпизод', ' %d эпизода', '%d эпизодов'));
    const latestEpisode = computed(() => props?.release?.episodes?.sort((a, b) => b?.ordinal - a?.ordinal)?.[0])

</script>

<style scoped lang="scss">

    .episode {
        background-color: rgba(255, 255, 255, 0.1);
    }
</style>

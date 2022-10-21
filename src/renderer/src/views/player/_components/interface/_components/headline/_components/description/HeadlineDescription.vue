<template>
    <div>
        <div v-if="episodeOrdinal !== null" class="text-h6 text-line-height-1.3">Эпизод {{ episodeOrdinal }}</div>
        <div v-if="episodeName !== null" class="fz-.75">{{ episodeName }}</div>
        <div v-if="releaseName" class="fz-.75 text-grey">{{ releaseName }}</div>
    </div>
</template>

<script setup>

    // Vue
    import {computed, inject} from "vue";

    // Inject
    const release = inject('release');
    const episode = inject('episode');

    // Computed
    const releaseName = computed(() => release?.value?.name);
    const episodeName = computed(() => episode?.value?.name);
    const episodeOrdinal = computed(() => episode?.value?.ordinal);

</script>

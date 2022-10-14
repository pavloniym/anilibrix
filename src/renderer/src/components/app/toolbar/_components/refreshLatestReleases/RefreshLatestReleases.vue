<template>
    <v-btn v-bind="options" @click="latestReleases.fetchLatestReleases">
        <v-icon size="18" icon="mdi-refresh"/>
        <v-tooltip activator="parent" location="start" text="Обновить последние релизы"/>
    </v-btn>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Store
    import {useLatestReleasesStore} from "@store/releases/latestReleases/latestReleasesStore";

    // Store
    const latestReleases = useLatestReleasesStore();

    // Computed
    const options = computed(() => {
        return {
            size: 36,
            icon: true,
            loading: latestReleases.isLoading,
        }
    })

</script>

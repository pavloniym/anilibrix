<template>
    <div class="d-flex flex-column justify-center">
        <heading v-model:index="index" class="mb-3"/>
        <slider v-model:index="index"/>
        <release v-bind="{index}" class="mt-6"/>
    </div>
</template>

<script setup>

    // Vue
    import {ref} from "vue";

    // Components
    import Slider from './_components/slider/LatestReleasesSlider'
    import Heading from './_components/heading/LatestReleasesHeading'
    import Release from './_components/release/LatestReleasesRelease'

    // Composables
    import {useLatestReleasesStore} from "@store/latestReleases/latestReleasesStore";

    // Bindings
    const latestReleases = useLatestReleasesStore();

    // State
    const index = ref(0);

</script>

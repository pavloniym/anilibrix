<template>
    <div class="d-flex flex-column justify-center">
        <heading v-model:index="index"/>
        <slider v-model:index="index">
            <template v-slot:append>
                <release v-bind="{index}" class="mt-6"/>
            </template>
        </slider>
    </div>
</template>

<script setup>

    // Vue
    import {ref} from "vue";

    // Components
    import Slider from './_components/slider/LatestReleasesSlider'
    import Heading from './_components/heading/LatestReleasesHeading'
    import Release from './_components/release/LatestReleasesRelease'

    // State
    const index = ref(0);

</script>

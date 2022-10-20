<template>
    <div class="d-flex flex-column justify-center h-100">
        <slider v-model:index="index">

            <!-- Heading -->
            <template v-slot:prepend>
                <heading class="mb-6" v-model:index="index"/>
            </template>


            <!-- Release -->
            <!-- Actions -->
            <template v-slot:append>
                <release v-bind="{index}" class="mt-6"/>
            </template>

        </slider>
    </div>
</template>

<script setup>


    // Components
    import Slider from './_components/slider/LatestReleasesSlider'
    import Heading from './_components/heading/LatestReleasesHeading'
    import Release from './_components/release/LatestReleasesRelease'

    // Vue
    import {ref} from "vue";

    // State
    const index = ref(0);

</script>

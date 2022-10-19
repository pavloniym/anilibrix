<template>
    <slot name="prepend"/>
    <v-slide-group ref="slider" v-bind="options" @update:model-value="$emit('update:index', $event)">
        <v-slide-group-item v-for="(release, k) in latestReleases?.items" v-slot="{ isSelected, toggle, selectedClass }">
            <poster v-bind="{release, isSelected}" :class="{'ml-1': k > 0}" @click.native="toggle"/>
        </v-slide-group-item>
    </v-slide-group>
    <slot name="append"/>
</template>

<script setup>


    // Components
    import Poster from './_components/poster/SliderPoster'

    // Props
    const props = defineProps({
        index: {
            type: Number,
            default: 0
        },
    });

    // Composables
    import {useLatestReleasesStore} from "@store/latestReleases/latestReleasesStore";
    import {computed, provide, ref} from "vue";

    // Bindings
    const slider = ref(null);
    const latestReleases = useLatestReleasesStore();

    // Computed
    const options = computed(() => ({
        mandatory: true,
        showArrows: false,
        modelValue: props.index,
        centerActive: true,
    }))

    // Provide
    provide('slider', slider);

</script>

<style scoped lang="scss">

    :deep(.v-slide-group__prev) {
        display: none !important;
    }

    :deep(.v-slide-group__next) {
        display: none !important;
    }

</style>

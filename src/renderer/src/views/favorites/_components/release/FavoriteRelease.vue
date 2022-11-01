<template>

    <!-- Container -->
    <!-- With intersection observer -->
    <div ref="container" v-intersect="onIntersect" :style="{height: realCardHeight + 'px'}">

        <!-- Card -->
        <!-- Overlay -->
        <v-card v-bind="card" v-if="isVisible" class="rounded text-unselect cursor-pointer bg-grey-darken-4">
            <placeholder isAbsolute/>
            <v-hover v-slot:default="{ isHovering, props}">
                <v-img v-bind="{...props, ...image}" class="rounded" height="100%" width="100%">
                    <v-fade-transition>
                        <overlay v-if="isHovering" v-bind="{release}"/>
                    </v-fade-transition>
                </v-img>
            </v-hover>
        </v-card>

    </div>
</template>

<script setup>

    // Vue
    import {computed, ref} from "vue";

    // Components
    import Overlay from './_components/overlay/ReleaseOverlay';
    import Placeholder from "@components/interface/placeholders/logo/LogoPlaceholder";

    // Composables
    import {useElementSize} from '@vueuse/core'

    // Routes
    import {RELEASE_ROUTE} from "@router/release/releaseRoutes";

    // Props
    const props = defineProps({
        release: {type: Object, default: null},
        aspectRatio: {type: Number, default: 0.7},
    })

    // State
    const container = ref(null);
    const isVisible = ref(false);

    // Computed
    const card = computed(() => ({
        to: {name: RELEASE_ROUTE, params: {releaseId: props?.release?.id}},
        flat: true,
        width: '100%',
        height: elementSize?.height?.value + 'px'
    }))

    // Computed
    const image = computed(() => ({src: props?.release?.poster}))
    const elementSize = useElementSize(container);
    const realCardHeight = computed(() => elementSize?.width?.value / props?.aspectRatio);

    // Methods
    const onIntersect = (isIntersecting) => isVisible.value = isIntersecting;


</script>

<template>
    <v-card v-bind="card" class="rounded text-unselect cursor-pointer">
        <v-hover v-slot:default="{ isHovering, props}">

            <!-- Image -->
            <!-- Overlay -->
            <v-img v-bind="{...props, ...image}" class="rounded" height="100%" width="100%">
                <v-fade-transition>
                    <overlay v-if="isHovering" v-bind="{release}"/>
                </v-fade-transition>
            </v-img>

        </v-hover>
    </v-card>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Components
    import Overlay from './_components/overlay/ReleaseOverlay';

    // Routes
    import {RELEASE_ROUTE} from "@router/release/releaseRoutes";

    // Props
    const props = defineProps({
        width: {type: String, default: '100%'},
        height: {type: String, default: '100%'},
        release: {type: Object, default: null},
    })

    // Computed
    const image = computed(() => ({
        src: props?.release?.poster,
        lazySrc: props?.release?.poster,
    }))

    // Computed
    const card = computed(() => ({
        to: {name: RELEASE_ROUTE, params: {releaseId: props?.release?.id}},
        flat: true,
        width: props?.width,
        height: props?.height,
    }))

</script>

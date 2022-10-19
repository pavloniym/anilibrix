<template>
    <div>

        <!-- Title -->
        <div class="text-h4 font-weight-black text-truncate">{{ title }}</div>

        <!-- Genres -->
        <!-- Subtitle -->
        <div class="mt-1">
            <div class="fz-.75 text-grey">{{ subtitle }}</div>
            <div class="fz-.75 text-grey">{{ genres }}</div>
        </div>


        <!-- Episode -->
        <!-- Favorite action -->
        <v-layout class="my-2">
            <!--            <favorite v-bind="{release}" class="mr-1"/>
                        <v-chip v-text="episode.title" label color="secondary" class="font-weight-black" :style="{height: '36px'}"/>-->
        </v-layout>

        <!-- Description -->
        <div class="text-grey" :style="{height: '75px'}">
            <v-clamp :text="description" max-height="75px"/>
        </div>

    </div>
</template>

<script setup>

    // Props
    const props = defineProps({
        index: {type: Number, default: 0},
    });

    // Utils
    import VClamp from 'vue3-text-clamp'

    // Vue
    import {computed} from "vue";

    // Composables
    import {useLatestReleasesStore} from "@store/latestReleases/latestReleasesStore";

    // Bindings
    const latestReleases = useLatestReleasesStore();

    // Computed
    const release = computed(() => latestReleases?.items?.[props.index]);

    // Computed
    const title = computed(() => release?.value?.name);
    const genres = computed(() => (release?.value?.genres || []).join(' • '));
    const subtitle = computed(() => [release?.value?.originalName, release?.value?.year, release?.value?.type].filter(v => v).join(' • '));
    const description = computed(() => release?.value?.description);


</script>

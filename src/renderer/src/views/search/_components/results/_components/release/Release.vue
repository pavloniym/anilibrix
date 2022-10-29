<template>
    <v-list-item v-bind="{to}" class="py-3">

        <!-- Poster -->
        <template v-slot:prepend>
            <v-avatar color="grey-lighten-1" size="50">
               <v-img cover :src="poster" :lazySrc="poster"/>
            </v-avatar>
        </template>

        <!-- Title + Subtitle -->
        <v-list-item-title v-text="title"/>
        <v-list-item-subtitle v-text="subtitle" class="fz-.70"/>
        <v-list-item-subtitle v-text="type" class="fz-.70"/>

    </v-list-item>
</template>

<script setup>

    // Props
    const props = defineProps({
        release: {
            type: Object,
            default: null
        }
    })

    // Vue
    import {computed} from "vue";

    // Router
    import {RELEASE_ROUTE} from "@router/release/releaseRoutes";


    const to = computed(() => ({name: RELEASE_ROUTE, params: {releaseId: props?.release?.id}}));
    const type = computed(() => [props?.release?.year, props?.release?.type].filter(v => v).join(' • '));
    const title = computed(() => props?.release?.name);
    const poster = computed(() => props?.release?.poster);
    const subtitle = computed(() => props?.release?.originalName);

</script>

<template>
    <v-row dense>
        <template v-for="release in (favorites?.items || [])" :key="release.id">
            <v-col cols="3" lg="2">
                    <release v-bind="{release}"/>
            </v-col>
        </template>
    </v-row>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Composables
    import {useFavoritesStore} from "@store/favorites/favoritesStore";

    // Components
    import Release from '../../_components/release/FavoriteRelease'

    // Bindings
    const favorites = useFavoritesStore();

    // Computed
    const releases = computed(() => favorites?.items || []);

</script>


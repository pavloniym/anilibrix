<template>
    <v-row dense>
        <template v-for="release in searchedResults" :key="release?.id">
            <v-col cols="4" md="3" lg="2">
                <release v-bind="{release}"/>
            </v-col>
        </template>
    </v-row>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Composables
    import {useFuse} from '@vueuse/integrations/useFuse'
    import {useFavoritesStore} from "@store/favorites/favoritesStore";

    // Components
    import Release from '../../_components/release/FavoriteRelease'

    // Bindings
    const favorites = useFavoritesStore();

    // Computed
    const search = computed(() => favorites?.filters?.searchInput)
    const releases = computed(() => favorites?.items || [])
    const searchedResults = computed(() => (results?.value || []).map(ref => ref?.item))

    // Computed
    const {results} = useFuse(search, releases, {
        fuseOptions: {keys: ['name', 'originalName']},
        matchAllWhenSearchEmpty: true
    })

</script>


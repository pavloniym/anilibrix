<template>
    <v-list v-if="search?.searchInput?.length > 0 && search.isLoading === false" dense>

        <!-- Releases -->
        <template v-if="search?.items?.length > 0">
            <template v-for="(release, k) in search.items" :key="release.id">
                <v-divider v-if="k > 0"/>
                <release v-bind="{release}"/>
            </template>
        </template>

    </v-list>
</template>

<script setup>

    // Components
    import Release from './_components/release/Release'

    // Store
    import {useSearchStore} from "@store/search/searchStore";

    // Store
    const search = useSearchStore();

</script>

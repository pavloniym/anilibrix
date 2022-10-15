<template>
    <v-text-field v-model="search.searchInput" v-bind="options"/>
</template>

<script setup>

    // Utils
    import __debounce from "lodash/debounce";

    // Vue
    import {computed, watch} from "vue";

    // Store
    import {useSearchStore} from "@store/search/searchStore";

    // Store
    const search = useSearchStore();

    // Computed
    const options = computed(() => ({
        variant: 'solo',
        loading: search.isLoading === true,
        clearable: true,
        autofocus: true,
        hideDetails: true,
        placeholder: 'Поиск ...',
        autocomplete: 'off',
    }))

    // Watch
    watch(() => search.searchInput, __debounce(search.searchReleases, 500))

</script>

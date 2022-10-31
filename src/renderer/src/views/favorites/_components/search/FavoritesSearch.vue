<template>
    <v-text-field v-model="favorites.filters.searchInput" v-bind="options"/>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Composables
    import {useFavoritesStore} from "@store/favorites/favoritesStore";

    // Bindings
    const favorites = useFavoritesStore();

    // Computed
    const options = computed(() => ({
        variant: 'solo',
        density: 'compact',
        clearable: true,
        autofocus: true,
        hideDetails: true,
        placeholder: 'Поиск ...',
        autocomplete: 'off',
    }));


</script>

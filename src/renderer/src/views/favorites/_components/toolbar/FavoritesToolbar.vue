<template>
    <v-row no-gutters align="center">

        <!-- Search -->
        <v-text-field v-model="favorites.filters.searchInput" v-bind="options"/>

        <!-- Refresh -->
        <!-- Settings -->
        <template v-for="(item, k) in actions" :key="k">
            <v-btn v-bind="item.btn" @click="item.action">
                <v-icon v-bind="item.icon"/>
                <v-tooltip v-bind="item.tooltip" activator="parent"/>
            </v-btn>
        </template>
    </v-row>
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


    // Computed
    const actions = computed(() => [
        {
            btn: {class: ['ml-2'], height: 40, minWidth: 20, loading: favorites.isLoading},
            icon: {size: 18, icon: 'mdi-sync',},
            action: async () => await favorites.fetchFavorites(),
            tooltip: {text: 'Обновить', location: 'start'}
        },
        {
            btn: {class: ['ml-2'], height: 40, minWidth: 20},
            icon: {size: 18, icon: 'mdi-cog',},
            action: () => favorites.filters.showSettings = !favorites?.filters?.showSettings,
            tooltip: {text: 'Настройки', location: 'start'}
        }
    ])


</script>

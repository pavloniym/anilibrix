<template>
    <div class="d-flex align-center">
        <template v-for="item in items">
            <v-btn variant="text" class="mr-1 px-3" height="30" :to="item.to">
                <v-icon size="18" class="mr-2">{{ item.icon }}</v-icon>
                <span class="fz-.70 font-weight-bold text-h6">{{ item.title }}</span>
            </v-btn>
        </template>
    </div>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Routes
    import {CATALOG_ROUTE} from "@router/catalog/catalogRoutes";
    import {FAVORITES_ROUTE} from "@router/favorites/favoritesRoutes";
    import {LATEST_RELEASES_ROUTE} from "@router/latestReleases/latestReleasesRoutes";

    const items = computed(() => {
        return [
            {to: {name: LATEST_RELEASES_ROUTE}, icon: 'mdi-view-column', title: 'Релизы'},
            {to: {name: CATALOG_ROUTE}, icon: 'mdi-folder-text-outline', title: 'Каталог'},
            {to: {name: FAVORITES_ROUTE}, icon: 'mdi-star', title: 'Избранное'},
            {to: {name: FAVORITES_ROUTE}, icon: 'mdi-filmstrip-box-multiple', title: 'История'},
        ]
    })

</script>

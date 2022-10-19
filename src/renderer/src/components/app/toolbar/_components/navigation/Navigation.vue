<template>
    <div class="d-flex align-center">
        <template v-for="(item, k) in items" :key="k">
            <v-btn variant="text" class="mr-1 px-3" height="30" :to="item.to" >
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
    import {RELEASES_ROUTE} from "@router/latestReleases/latestReleasesRoutes";

    const items = computed(() => {
        return [
            {
                to: {name: RELEASES_ROUTE},
                icon: 'mdi-view-column',
                title: 'Релизы',
            },
            {
                to: {name: RELEASES_ROUTE},
                icon: 'mdi-folder-text-outline',
                title: 'Каталог',
            },
            {
                to: {name: RELEASES_ROUTE},
                icon: 'mdi-star',
                title: 'Избранное',
            },
        ]
    })

</script>

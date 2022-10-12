<template>
    <v-layout>
        <template v-for="(item, k) in items">
            <v-btn small text exact class="mr-1" height="38" :to="item.to" :key="k">
                <v-icon size="18" class="mr-2">{{ item.icon }}</v-icon>
                <span class="font-weight-bold text-body-2">{{ item.title }}</span>
            </v-btn>
        </template>
    </v-layout>
</template>

<script>

    // Routes
    import {CATALOG_ROUTE} from "@/renderer/src/router/catalog/catalogRoutes";
    import {RELEASES_ROUTE} from "@/renderer/src/router/releases/releasesRoutes";
    import {FAVORITES_ROUTE} from "@/renderer/src/router/favorites/favoritesRoutes";

    export default {
        computed: {

            /**
             * Get navigation items
             *
             * @return {array}
             */
            items() {
                return [
                    {
                        to: {name: RELEASES_ROUTE},
                        icon: 'mdi-view-column',
                        title: 'Релизы',
                    },
                    {
                        to: {name: CATALOG_ROUTE},
                        icon: 'mdi-folder-text-outline',
                        title: 'Каталог',
                    },
                    {
                        to: {name: FAVORITES_ROUTE},
                        icon: 'mdi-star',
                        title: 'Избранное',
                    },
                ]
            }

        }
    }
</script>

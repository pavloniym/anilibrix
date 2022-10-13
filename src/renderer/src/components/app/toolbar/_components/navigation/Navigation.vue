<template>
    <v-layout>
        <template v-for="(item, k) in items" :key="k">
            <v-btn small text class="mr-1" height="38" :to="item.to">
                <v-icon size="18" class="mr-2">{{ item.icon }}</v-icon>
                <span class="font-weight-bold text-body-2">{{ item.title }}</span>
            </v-btn>
        </template>
    </v-layout>
</template>

<script>

    // Routes
    import {RELEASES_ROUTE} from "@router/releases/releasesRoutes";


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
            }

        }
    }
</script>

<template>
    <v-layout>
        <template v-for="(item, k) in items">
            <v-btn small text exact class="mr-1" height="38" :to="item.to">
                <v-icon size="18" class="mr-2">{{ item.icon }}</v-icon>
                <span class="font-weight-bold text-body-2">{{ item.title }}</span>
            </v-btn>
        </template>
    </v-layout>
</template>

<script>
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
                        to: {name: 'releases'},
                        icon: 'mdi-view-column',
                        title: 'Релизы',
                    },
                    {
                        to: {name: 'catalog'},
                        icon: 'mdi-folder-text-outline',
                        title: 'Каталог',
                    },
                    {
                        to: {name: 'favorites'},
                        icon: 'mdi-star',
                        title: 'Избранное',
                    },
                ]
            }

        }
    }
</script>

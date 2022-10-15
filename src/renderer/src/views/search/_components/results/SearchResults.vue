<template>
    <v-list v-if="search?.searchInput?.length > 0" dense>

        <!-- Releases -->
        <template v-if="search?.items?.length > 0">
            <template v-for="(release, k) in search.items"  :key="release.id">
                <v-divider v-if="k > 0"/>
                <release v-bind="{release}"/>
            </template>
        </template>

        <!-- Placeholder -->
<!--        <placeholder-of-list v-else v-bind="placeholder"/>-->

    </v-list>
</template>

<script setup>


    // App Components
    //import {PlaceholderOfList} from '@components/interface/cards/placeholders'

    // Components
    import Release from './_components/release/Release'

    import {useSearchStore} from "@store/search/searchStore";

    const search = useSearchStore();





    /*   // Store
       import {mapState} from 'vuex'

       export default {
           components: {
               Release,
               PlaceholderOfList,
           },
           data() {
               return {
                   placeholder: {
                       title: 'Нет релизов',
                       subtitle: 'По данному запросу не найдено ни одного релиза'
                   }
               }
           },
           computed: {
               ...mapState('app/search', {_releases: s => s.releases || []}),

           }
       }*/
</script>

<template>
    <div class="d-flex flex-column justify-center h-100">

        <!-- Search -->
        <!-- Heading -->
        <heading v-bind="{title, subtitle}" class="mb-3"/>
        <search class="mb-3"/>

        <!-- Releases -->
        <plain-view/>

    </div>
</template>

<script setup>

    // Vue
    import {ref} from "vue";

    // Components
    import Search from './_components/search/FavoritesSearch'
    import Heading from '@components/interface/heading/Heading'

    // Views
    import PlainView from './_views/plain/FavoritesPlainView'

    // State
    const title = ref('Избранные релизы');
    const subtitle = ref('Список ваших избранных релизов');


</script>

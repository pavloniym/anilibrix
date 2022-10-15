<template>
    <v-toolbar flat color="transparent" height="40" class="w-100 flex-shrink-0">
        <navigation/>
        <v-spacer/>
        <search/>
        <refresh-latest-releases class="mx-1"/>
        <settings/>
    </v-toolbar>
</template>

<script setup>

    import Search from './_components/search/Search'
    import Settings from './_components/settings/Settings'
    import Navigation from './_components/navigation/Navigation'
    import RefreshLatestReleases from './_components/refreshLatestReleases/RefreshLatestReleases'


    //import Account from './components/account/AppToolbarAccount'


</script>

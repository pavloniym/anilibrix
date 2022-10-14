<template>
    <v-toolbar flat color="transparent" height="40" class="w-100">
        <navigation/>
        <v-spacer/>
        <refresh-latest-releases/>
        <settings/>
    </v-toolbar>
</template>

<script setup>

    import Settings from './_components/settings/Settings'
    import Navigation from './_components/navigation/Navigation'
    import RefreshLatestReleases from './_components/refreshLatestReleases/RefreshLatestReleases'

    //import Search from './_components/search/AppToolbarSearch'
    //import Account from './components/account/AppToolbarAccount'


</script>

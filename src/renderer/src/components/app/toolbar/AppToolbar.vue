<template>
    <v-toolbar flat color="transparent" height="40" class="w-100 flex-shrink-0" :style="{zIndex: 1000}">
        <navigation class="mr-1"/>
        <v-spacer/>
        <search class="ml-1"/>
        <refresh-latest-releases class="ml-1"/>
        <settings class="ml-1"/>
        <account class="ml-1"/>
    </v-toolbar>
</template>

<script setup>

    import Search from './_components/search/Search'
    import Account from './_components/account/Account'
    import Settings from './_components/settings/Settings'
    import Navigation from './_components/navigation/Navigation'
    import RefreshLatestReleases from './_components/refreshLatestReleases/RefreshLatestReleases'

</script>

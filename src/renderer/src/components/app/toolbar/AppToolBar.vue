<template>
    <v-app-bar flat color="transparent" class="toolbar shrink">
        <navigation class="mr-4"/>
<!--
        <search class="mr-4"/>
        <update/>
        <notifications/>
        <settings/>
        <account/>-->
    </v-app-bar>
</template>

<script setup>

    import Navigation from './_components/navigation/Navigation'

    /*import Update from './components/update/AppToolbarUpdate'
    import Search from './components/search/AppToolbarSearch'
    import Account from './components/account/AppToolbarAccount'
    import Settings from './components/settings/AppToolbarSettings'

    import Notifications from './components/notifications/AppToolbarNotifications'*/

</script>

<style scoped lang="scss">

    .toolbar {
        ::v-deep {
            .v-toolbar__content {
                padding-left: 0;
                padding-right: 0;
            }
        }
    }

</style>

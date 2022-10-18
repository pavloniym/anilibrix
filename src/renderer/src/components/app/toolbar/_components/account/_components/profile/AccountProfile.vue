<template>
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <avatar v-bind="{props}"/>
        </template>
        <v-list>
            <credentials/>
            <statistics/>
            <actions/>
        </v-list>
    </v-menu>
</template>

<script setup>

    // Components
    import Avatar from './_components/avatar/ProfileAvatar'
    import Actions from './_components/list/actions/ProfileActions'
    import Statistics from './_components/list/statistics/ProfileStatistics'
    import Credentials from './_components/list/credentials/ProfileCredentials'

</script>

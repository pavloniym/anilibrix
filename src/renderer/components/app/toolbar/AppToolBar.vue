<template>
    <v-fade-transition appear>
        <v-app-bar v-if="!hideToolbar" flat color="transparent" class="toolbar shrink">
            <navigation class="mr-4"/>
            <search class="mr-4"/>
            <update/>
            <notifications/>
            <settings/>
            <account/>
        </v-app-bar>
    </v-fade-transition>
</template>

<script>

    import Update from './components/update/AppToolbarUpdate'
    import Search from './components/search/AppToolbarSearch'
    import Account from './components/account/AppToolbarAccount'
    import Settings from './components/settings/AppToolbarSettings'
    import Navigation from './components/navigation/AppToolbarNavigation'
    import Notifications from './components/notifications/AppToolbarNotifications'

    export default {
        components: {
            Update,
            Search,
            Account,
            Settings,
            Navigation,
            Notifications
        },

        computed: {

            /**
             * Check if should hide toolbar
             *
             * @return {*|boolean}
             */
            hideToolbar() {
                return this.$__get(this.$route, 'meta.layout.hide_toolbar') || false;
            }

        }
    }

</script>

<style lang="scss" scoped>

    .toolbar {
        ::v-deep {
            .v-toolbar__content {
                padding-left: 0;
                padding-right: 0;
            }
        }
    }

</style>

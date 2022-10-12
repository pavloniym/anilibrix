<template>
    <v-app>

        <!-- System Bar -->
        <!--        <app-system-bar/>-->
        <!--        <app-settings/>-->

        <!-- Content -->
        <app-loader v-if="isLoading"/>
        <!--        <template v-else>
                    <v-fade-transition mode="out-in" appear>
                        <component :is="layout" :key="$route.fullPath">
                            <router-view/>
                        </component>
                    </v-fade-transition>
                </template>-->

        <!-- Errors -->
        <!-- Notifications -->
        <!--        <app-errors/>-->
        <!--        <app-notifications/>-->

    </v-app>
</template>


<script setup>

    // App Components
    import AppLoader from '@components/app/loader/AppLoader.vue'
    //import AppSettings from "@components/app/settings/AppSettings.vue";


    //import AppErrors from '@components/app/errors/AppErrors'
    //import AppToolBar from "@components/app/toolbar/AppToolBar";
    //import AppSystemBar from '@components/app/systembar/AppSystemBar'
    //import AppBaseLayout from '@layouts/base/BaseLayout'
    //import AppNotifications from "@components/app/notifications/AppNotifications";

    // Vue
    import {ref, onBeforeMount} from 'vue'

    // Store
    import {useAppAccountStore} from '@store/app/account/appAccountStore'
    import {useAppSettingsStore} from '@store/app/settings/appSettingsStore'

    let isLoading = ref(true);

    const appAccountStore = useAppAccountStore();
    const appSettingsStore = useAppSettingsStore();

    onBeforeMount(async () => {

        // Set as loading
        isLoading = true;

        // Fetch profile
        //await this.fetchProfile();

        // Reset loading view
        setTimeout(() => isLoading = false, 200);

        // Fetch content
        // Toggle auto updates
        // Push to saved welcome view
        //this.fetchContent();
        //this.toggleUpdates();
        //this.restoreWelcomeView();

    });

</script>

<!--<script>

    // App Components
    import AppLoader from '@/renderer/src/components/app/loader/AppLoader'
    import AppErrors from '@/renderer/src/components/app/errors/AppErrors'
    import AppToolBar from "@/renderer/src/components/app/toolbar/AppToolBar";
    import AppSettings from "@/renderer/src/components/app/settings/AppSettings";
    import AppSystemBar from '@/renderer/src/components/app/systembar/AppSystemBar'
    import AppBaseLayout from '@/renderer/src/layouts/base/BaseLayout'
    import AppNotifications from "@/renderer/src/components/app/notifications/AppNotifications";

    // Store
    import {mapState, mapActions} from 'vuex'
    import {FETCH_PROFILE_ACTION} from '@/renderer/src/store/app/account/appAccountStore'
    import {SET_WELCOME_VIEW_ACTION} from '@/renderer/src/store/app/settings/appSettingsStore'

    // Routes
    import {CATALOG_ROUTE} from "@/renderer/src/router/catalog/catalogRoutes";
    import {RELEASES_ROUTE} from "@/renderer/src/router/releases/releasesRoutes";
    import {FAVORITES_ROUTE} from "@/renderer/src/router/favorites/favoritesRoutes";

    export default {
        name: 'AniLibrix',
        components: {
            AppLoader,
            AppErrors,
            AppToolBar,
            AppSettings,
            AppSystemBar,
            AppBaseLayout,
            AppNotifications,
        },
        data() {
            return {
                isLoading: false,
            }
        },


        computed: {
            ...mapState('app/settings', {
                _welcomeView: s => s.welcomeView,
                _hasAutoUpdates: s => s.hasAutoUpdates,
                _autoUpdatesTimeout: s => (s.autoUpdatesTimeout || 5) * 60 * 1000
            }),

            /**
             * Get current route name
             *
             * @return {string|null}
             */
            view() {
                return this.$route?.name || null;
            },


            /**
             * Get route layout
             *
             * @return {{}}
             */
            layout() {
                return this.$route?.meta?.layout?.is || AppBaseLayout;
            },

        },


        methods: {
            ...mapActions('releases', {_getReleases: 'getReleases'}),
            ...mapActions('favorites', {_getFavorites: 'getFavorites'}),
            ...mapActions('app/settings', [SET_WELCOME_VIEW_ACTION]),


            /**
             * Fetch profile
             *
             * @return {Promise<void>}
             */
            async fetchProfile() {
                await this.$store.dispatchPromise('app/account/' + FETCH_PROFILE_ACTION)
            },


            /**
             * Fetch content
             *
             * @return {void}
             */
            async fetchContent() {
                this.$store.dispatchPromise('releases/getReleases');
                this.$store.dispatchPromise('favorites/getFavorites');
            },


            /**
             * Toggle releases updates
             *
             * @return {void}
             */
            toggleUpdates() {
                if (this._hasAutoUpdates === true) {
                    setInterval(() => this.fetchContent(), this._autoUpdatesTimeout);
                }
            },


            /**
             * Restore welcome view
             *
             * @return {void}
             */
            async restoreWelcomeView() {
                if (this._welcomeView !== null && this.view !== this._welcomeView) {
                    await this.$router.push({name: this._welcomeView});
                }
            }

        },

        async created() {

            // Initial loading
            this.isLoading = true;

            // Fetch profile
            await this.fetchProfile();

            // Reset loading view
            setTimeout(() => this.isLoading = false, 200);

            // Fetch content
            // Toggle auto updates
            // Push to saved welcome view
            this.fetchContent();
            this.toggleUpdates();
            this.restoreWelcomeView();

        },


        watch: {

            view: {
                handler(view) {

                    // Check if current view is one of main views
                    // Set this main view as welcome
                    if ([RELEASES_ROUTE, CATALOG_ROUTE, FAVORITES_ROUTE].includes(view)) {
                        this[SET_WELCOME_VIEW_ACTION](view);
                    }
                }
            }

        }

    }
</script>-->

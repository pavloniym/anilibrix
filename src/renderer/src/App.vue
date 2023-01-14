<template>
    <v-app>

        <!-- Bar -->
        <!-- Toasts -->
        <!-- Settings -->
        <app-bar/>
        <app-toasts/>
        <app-settings/>

        <!-- Content -->
        <component :is="layout" :key="useRoute().fullPath">
            <router-view/>
        </component>

    </v-app>
</template>

<script setup>

    // App Components
    import AppBar from "@components/app/bar/AppBar";
    import AppToasts from '@components/app/toasts/AppToasts'
    import AppSettings from '@components/app/settings/AppSettings';
    import AppBaseLayout from '@layouts/base/BaseLayout'

    // Vue
    import {computed, onMounted, watch} from 'vue'

    // Composables
    import {useAccountStore} from '@store/account/accountStore'
    import {useSettingsStore} from '@store/settings/settingsStore'
    import {useFavoritesStore} from "@store/favorites/favoritesStore";
    import {useRoute, useRouter} from 'vue-router'
    import {useLatestReleasesStore} from "@store/latestReleases/latestReleasesStore";

    // Routes
    import {CATALOG_ROUTE} from "@router/catalog/catalogRoutes";
    import {FAVORITES_ROUTE} from "@router/favorites/favoritesRoutes";
    import {LATEST_RELEASES_ROUTE} from "@router/latestReleases/latestReleasesRoutes";

    // Bindings
    const route = useRoute();
    const router = useRouter();
    const account = useAccountStore();
    const settings = useSettingsStore();
    const favorites = useFavoritesStore();
    const latestReleases = useLatestReleasesStore();

    // Computed
    const view = computed(() => route?.name);
    const layout = computed(() => route?.meta?.layoutComponent || AppBaseLayout);
    const memorableViews = computed(() => [LATEST_RELEASES_ROUTE, CATALOG_ROUTE, FAVORITES_ROUTE]);

    // Methods
    const autoUpdates = async () => settings.hasAutoUpdates === true ? setInterval(() => latestReleases.fetchLatestReleases(), settings.autoUpdatesTimeout * 60 * 1000) : null;
    const saveCurrentView = async () => settings.welcomeView = view?.value || LATEST_RELEASES_ROUTE;
    const restoreWelcomeView = async () => await router.push({name: settings.welcomeView || LATEST_RELEASES_ROUTE})

    // Watch
    watch(view, () => memorableViews?.value.includes(view?.value) ? saveCurrentView() : null)

    // On mount
    onMounted(async () => {
        await Promise.allSettled([
            account.fetchProfile(),
            favorites.fetchFavorites(),
            latestReleases.fetchLatestReleases()
            // TODO: fetch watched releases
        ]);
    });


    onMounted(async () => {
        await autoUpdates();
        await restoreWelcomeView();
    })

</script>

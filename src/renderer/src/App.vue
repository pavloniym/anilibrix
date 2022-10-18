<template>
    <v-app>

        <!-- Bar -->
        <!-- Toasts -->
        <!-- Settings -->
        <app-bar/>
        <app-toasts/>
        <app-settings/>

        <!-- Content -->
        <v-fade-transition mode="out-in" appear>
            <component :is="layout" :key="useRoute().fullPath">
                <router-view/>
            </component>
        </v-fade-transition>

    </v-app>
</template>

<script setup>

    // App Components
    import AppBar from "@components/app/bar/AppBar";
    import AppToasts from '@components/app/toasts/AppToasts'
    import AppSettings from '@components/app/settings/AppSettings';

    // Layouts
    import AppBaseLayout from '@layouts/base/BaseLayout'

    // Vue
    import {useRoute} from 'vue-router'
    import {computed, onBeforeMount} from 'vue'

    // Composables
    import {useAccountStore} from '@store/account/accountStore'
    import {useSettingsStore} from '@store/settings/settingsStore'
    import {useLatestReleasesStore} from "@store/latestReleases/latestReleasesStore";

    // Bindings
    const route = useRoute();
    const account = useAccountStore();
    const settings = useSettingsStore();
    const latestReleases = useLatestReleasesStore();

    // Computed
    const view = computed(() => route?.name);
    const layout = computed(() => route?.meta?.layoutComponent || AppBaseLayout);

    /**
     * Auto updates
     * Make request to fetch latest releases
     *
     * @return {void}
     */
    const autoUpdates = () => {
        if (settings.hasAutoUpdates === true) {
            setInterval(() => latestReleases.fetchLatestReleases(), settings.autoUpdatesTimeout * 60 * 1000);
        }
    }


    onBeforeMount(async () => {

        // Fetch content
        await Promise.allSettled([
            account.fetchProfile(),
            latestReleases.fetchLatestReleases()
            // favorites
        ]);

        // TODO: fetch favorites
        // TODO: restore welcome view
        // TODO: save welcome view on change

        // Apply auto updates
        autoUpdates();

    });

</script>

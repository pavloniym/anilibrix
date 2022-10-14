<template>
    <v-app>

        <!-- Bar -->
        <!-- Settings -->
        <app-bar/>
        <app-settings/>


        <!-- Content -->
        <app-loader v-if="isLoading"/>
        <template v-else>
            <v-fade-transition mode="out-in" appear>
                <component :is="layout" :key="useRoute().fullPath">
                    <router-view/>
                </component>
            </v-fade-transition>
        </template>

        <!-- Errors -->
        <!-- Notifications -->
        <!--        <app-errors/>-->
        <!--        <app-notifications/>-->

    </v-app>
</template>


<script setup>

    // App Components
    import AppBar from "@components/app/bar/AppBar";
    import AppLoader from '@components/app/loader/AppLoader'
    import AppSettings from '@components/app/settings/AppSettings';

    // Layouts
    import AppBaseLayout from '@layouts/base/BaseLayout'

    //
    //import AppErrors from '@components/app/errors/AppErrors'
    //import AppToolBar from "@components/app/toolbar/AppToolBar";
    //import AppSystemBar from '@components/app/systembar/AppSystemBar'
    //import AppNotifications from "@components/app/notifications/AppNotifications";

    // Vue
    import {useRoute} from 'vue-router'
    import {ref, computed, onBeforeMount} from 'vue'

    // Store
    import {useAppAccountStore} from '@store/app/account/appAccountStore'
    import {useAppSettingsStore} from '@store/app/settings/appSettingsStore'
    import {useLatestReleasesStore} from "@store/releases/latestReleases/latestReleasesStore";

    // State
    const isLoading = ref(true);

    // Computed
    const view = computed(() => useRoute()?.name);
    const layout = computed(() => useRoute()?.meta?.layout?.is || AppBaseLayout);

    // Store
    const account = useAppAccountStore();
    const settings = useAppSettingsStore();
    const latestReleases = useLatestReleasesStore();

    onBeforeMount(async () => {

        // Set as loading
        isLoading.value = true;

        // Try to fetch profile
        await account.fetchProfile().then(() => isLoading.value = false);

        // Fetch content
        await Promise.allSettled([
            latestReleases.fetchLatestReleases() // latest release
            // favorites
        ]);

        // TODO: fetch favorites
        // TODO: toggle auto updates
        // TODO: restore welcome view
        // TODO: save welcome view on change

    });

</script>

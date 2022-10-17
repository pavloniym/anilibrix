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
    import {useAccountStore} from '@store/account/accountStore'
    import {useSettingsStore} from '@store/settings/settingsStore'
    import {useLatestReleasesStore} from "@store/latestReleases/latestReleasesStore";

    // State
    const isLoading = ref(true);

    // Computed
    const view = computed(() => useRoute()?.name);
    const layout = computed(() => useRoute()?.meta?.layoutComponent || AppBaseLayout);

    // Store
    const account = useAccountStore();
    const settings = useSettingsStore();
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

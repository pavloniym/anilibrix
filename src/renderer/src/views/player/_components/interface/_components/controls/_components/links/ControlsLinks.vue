<template>
    <div class="d-flex justify-start align-center h-100">
        <template v-for="button in buttons">
            <v-btn v-on="{...button.events}" v-bind="button.props">

                <!-- Text -->
                <div v-if="button?.text?.content" v-bind="button?.text" v-text="button?.text?.content"/>

                <!-- Icon -->
                <v-icon v-if="button?.icon" v-bind="button?.icon"/>

                <!-- Avatar -->
                <v-avatar v-if="button?.image" size="20">
                    <v-img v-bind="button?.image"/>
                </v-avatar>

                <!-- Tooltip -->
                <v-tooltip v-if="button?.tooltip?.title" v-bind="button?.tooltip" activator="parent">
                    <div class="fz-.75 text-line-height-1.1 font-weight-bold">{{ button?.tooltip?.title }}</div>
                    <div class="fz-.60 text-line-height-1.1">{{ button?.tooltip?.subtitle }}</div>
                </v-tooltip>

            </v-btn>
        </template>
    </div>
</template>

<script setup>

    // Vue
    import {computed, inject} from "vue";

    // Composables
    import {useRouter} from "vue-router";
    import {useSettingsStore} from "@store/settings/settingsStore";

    // Routes
    import {RELEASE_ROUTE} from "@router/release/releaseRoutes";
    import {FAVORITES_ROUTE} from "@router/favorites/favoritesRoutes";
    import {LATEST_RELEASES_ROUTE} from "@router/latestReleases/latestReleasesRoutes";

    // Bindings
    const router = useRouter();
    const settings = useSettingsStore();

    // Inject
    const player = inject('player');
    const release = inject('release');

    // Computed
    const buttons = computed(() =>
        [
            {
                icon: {icon: 'mdi-view-column', size: 20},
                props: {flat: true, icon: true, width: 35, height: 35, color: 'transparent'},
                events: {click: async () => await router.push({name: LATEST_RELEASES_ROUTE})},
                tooltip: {title: 'Последние релизы', location: 'top'},
            },
            {
                image: {src: settings.applyToConnectionHost(release?.value?.poster), cover: true},
                props: {flat: true, icon: true, width: 35, height: 35, color: 'transparent'},
                events: {
                    click: async () => await router.push({
                        name: RELEASE_ROUTE,
                        params: {releaseId: release?.value?.id}
                    })
                },
                tooltip: {title: release?.value?.name, location: 'top'},
            },
            {
                icon: {icon: 'mdi-star', size: 20},
                props: {flat: true, icon: true, width: 35, height: 35, color: 'transparent'},
                events: {click: async () => await router.push({name: FAVORITES_ROUTE})},
                tooltip: {title: 'Избранное', location: 'top'},
            },
            {
                icon: {icon: 'mdi-chevron-double-right', size: 20},
                props: {flat: true, icon: true, width: 35, height: 35, color: 'transparent'},
                events: {click: () => player.value.currentTime = player?.value.currentTime + settings.manualOpeningSkipSeconds},
                tooltip: {title: `Ручная перемотка`, subtitle: `+${settings.manualOpeningSkipSeconds} секунд`, location: 'top'},
                isVisible: settings.manualOpeningSkipButton === true,
            },
        ]
            .filter(b => b?.isVisible !== false)
    )

</script>

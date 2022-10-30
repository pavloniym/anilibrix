<template>
    <div>

        <!-- Title -->
        <div class="text-h4 font-weight-black text-truncate">{{ title }}</div>

        <!-- Genres -->
        <!-- Subtitle -->
        <div class="mt-1">
            <div class="fz-.75 text-grey">{{ subtitle }}</div>
            <div class="fz-.75 text-grey">{{ genres }}</div>
        </div>

        <!-- Episode -->
        <!-- Favorite toggle -->
        <v-layout class="mt-2">
            <v-chip
                v-text="latestEpisode?.title"
                label
                class="fz-.75 bg-secondary font-weight-black"
                :style="{height: '30px'}">
            </v-chip>
            <favorite-toggle v-bind="{release}" class="ml-1"/>
        </v-layout>

        <!-- Description -->
        <div class="my-4 text-grey" :style="{height: '75px'}">
            <v-clamp :text="description" max-height="75px"/>
        </div>


        <!-- Actions -->
        <v-layout>
            <template v-for="action in actions">
                <v-btn v-bind="action.props">
                    <v-icon v-if="action.icon" v-bind="action.icon"/>
                    <span>{{ action.title }}</span>
                </v-btn>
            </template>
        </v-layout>

    </div>
</template>

<script setup>

    // Props
    const props = defineProps({
        index: {type: Number, default: 0},
    });

    // Components
    import FavoriteToggle from '@components/release/favoriteToggle/ReleaseFavoriteToggle'

    // Utils
    import VClamp from 'vue3-text-clamp'

    // Vue
    import {computed} from "vue";

    // Composables
    import {useLatestReleasesStore} from "@store/latestReleases/latestReleasesStore";

    // Routes
    import {PLAYER_ROUTE} from "@router/player/playerRoutes";
    import {RELEASE_ROUTE} from "@router/release/releaseRoutes";

    // Bindings
    const latestReleases = useLatestReleasesStore();

    // Computed
    const release = computed(() => latestReleases?.items?.[props.index]);
    const latestEpisode = computed(() => (release?.value?.episodes || []).sort((a, b) => b?.ordinal - a?.ordinal)?.[0]);

    // Computed
    const title = computed(() => release?.value?.name);
    const genres = computed(() => (release?.value?.genres || []).join(' • '));
    const subtitle = computed(() => [release?.value?.originalName, release?.value?.year, release?.value?.type].filter(v => v).join(' • '));
    const description = computed(() => release?.value?.description);


    // Actions
    const actions = computed(() =>
        [
            {
                icon: {
                    icon: 'mdi-play',
                    class: ['mr-1'],
                    size: 24,
                },
                props: {
                    to: {
                        name: PLAYER_ROUTE,
                        params: {releaseId: release?.value?.id, episodeId: latestEpisode?.value?.id}
                    },
                    class: ['mr-1', 'pl-2'],
                },
                title: 'Смотреть',
            },
            {
                title: 'Релиз',
                props: {to: {name: RELEASE_ROUTE, params: {releaseId: release?.value?.id}}},
            }
        ]
    )


</script>

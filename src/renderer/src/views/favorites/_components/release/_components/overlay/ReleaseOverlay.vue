<template>
    <v-card flat class="overlay" height="100%" width="100%">
        <div class="px-4 d-flex flex-column align-center justify-center h-100">

            <!-- Episodes -->
            <episodes v-bind="{release}" class="mt-4"/>

            <!-- Name -->
            <!-- Season -->
            <!-- Genres -->
            <div class="d-flex flex-column align-center justify-center h-100 w-100">
                <name v-bind="{release}"/>
                <season v-bind="{release}" class="mt-4"/>
                <genres v-bind="{release}"/>
            </div>

            <!-- Actions -->
            <!--            <actions v-bind="{release}" class="mb-4 mt-2"/>-->

        </div>
    </v-card>
</template>

<script setup>

    // Components
    import Name from './_components/name/OverlayName'
    import Genres from './_components/genres/OverlayGenres'
    import Season from './_components/season/OverlaySeason'
    import Episodes from './_components/episodes/OverlayEpisodes'

    //import Actions from './_components/actions/ReleaseOverlayActions'

    // Props
    const props = defineProps({
        release: {type: Object, default: null}
    })


</script>

<style lang="scss" scoped>

    .overlay {
        top: 0;
        left: 0;
        position: absolute;
        transition: opacity .2s;
        background: linear-gradient(180deg, rgba(16, 16, 16, 0.9) 0%, rgba(16, 16, 16, .95) 100%);
    }

</style>

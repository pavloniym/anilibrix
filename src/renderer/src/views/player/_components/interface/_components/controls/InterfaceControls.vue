<template>
    <v-row :style="{height: '80px'}">
        <v-col>
            <links/>
        </v-col>
        <v-col>
            <playback/>
        </v-col>
        <v-col>
            <settings/>
        </v-col>
    </v-row>
</template>

<script setup>

    // Components
    import Links from './_components/links/ControlsLinks'
    import Playback from './_components/playback/ControlsPlayback'
    import Settings from './_components/settings/ControlsSettings'

</script>

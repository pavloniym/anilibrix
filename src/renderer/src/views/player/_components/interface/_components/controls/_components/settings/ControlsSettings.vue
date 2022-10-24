<template>
    <div class="d-flex justify-end align-center h-100">
        <volume/>
        <speed/>
        <properties/>
        <template v-for="button in buttons">
            <v-btn v-on="{...button.events}" v-bind="button.props">
                <v-icon v-bind="button.icon"/>
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

    // Components
    import Speed from './_components/speed/Speed'
    import Volume from './_components/volume/Volume'
    import Properties from './_components/properties/Properties'

    // Composables
    import {useFullscreenWindow} from "@composables/app/fullscreen/appFullscreen";

    // Bindings
    const {toggleFullscreen} = useFullscreenWindow();

    // Inject
    const player = inject('player');

    // Computed
    const buttons = computed(() => [
        {
            icon: {icon: 'mdi-picture-in-picture-bottom-right', size: 20},
            props: {flat: true, icon: true, width: 35, height: 35, color: 'transparent'},
            events: {click: () => player.value.pip = !player?.value?.pip},

        },
        {
            icon: {icon: 'mdi-fullscreen', size: 20},
            props: {flat: true, icon: true, width: 35, height: 35, color: 'transparent'},
            events: {click: toggleFullscreen},
        },
    ])

</script>

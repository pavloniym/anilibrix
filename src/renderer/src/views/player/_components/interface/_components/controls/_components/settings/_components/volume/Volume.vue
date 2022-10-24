<template>
    <v-hover>
        <template v-slot:default="{props, isHovering}">
            <div v-bind="props" class="d-flex align-center">
                <v-slider v-if="isHovering" v-bind="slider" class="mr-2" @update:modelValue="setVolume($event)"/>
                <v-btn v-bind="button.props" @click="toggleMute">
                    <v-icon v-bind="button.icon"/>
                </v-btn>
            </div>
        </template>
    </v-hover>
</template>

<script setup>

    // Vue
    import {computed, inject} from "vue";

    // Inject
    const player = inject('player')
    const volume = inject('volume');

    // Computed
    const isMuted = computed(() => player?.value?.muted === true);

    // Computed
    const icon = computed(() => {

        if (volume?.value > .66) return 'mdi-volume-high';
        if (volume?.value > .33) return 'mdi-volume-medium';
        if (volume?.value > 0) return 'mdi-volume-low';
        if (volume?.value === 0) return 'mdi-volume-off';

        return 'mdi-volume-high';
    })

    // Computed
    const button = computed(() => ({
        icon: {icon: icon?.value, size: 20},
        props: {flat: true, icon: true, width: 35, height: 35, color: 'transparent',}
    }))

    // Computed
    const slider = computed(() => ({
        min: 0,
        max: 1,
        step: .1,
        style: {maxWidth: '70px', width: '70px'},
        elevation: 0,
        thumbSize: 10,
        modelValue: volume?.value,
        hideDetails: true,
    }));


    // Methods
    const setVolume = (volume) => player.value.volume = volume;
    const toggleMute = () => player.value.muted = !isMuted?.value;

</script>

<template>
    <v-card flat>

        <!-- Back to section -->
        <back-to :component="backToSection"/>

        <!-- Speed items -->
        <template v-for="speed in items">
            <selector v-bind="speed.props" @click.native="() => setSpeed(speed.value)"/>
        </template>
    </v-card>
</template>

<script setup>

    // Vue
    import {computed, inject, shallowRef} from "vue";

    // Components
    import BackTo from './../../_components/backTo/BackTo'
    import Selector from './../../_components/selector/Selector'

    // Sections
    import Contents from './../contents/Contents'

    // State
    const backToSection = shallowRef(Contents)

    // Inject
    const player = inject('player')
    const currentSpeed = inject('currentSpeed')

    // Computed
    const items = computed(() => [
        {
            props: {
                title: '0.25x',
                icon: {size: 12, icon: 'mdi-circle'},
                isSelected: currentSpeed?.value === .25,
            },
            value: .25,
        },
        {
            props: {
                title: '0.50x',
                icon: {size: 12, icon: 'mdi-circle'},
                isSelected: currentSpeed?.value === .50,
            },
            value: .50,
        },
        {
            props: {
                title: '0.75x',
                icon: {size: 12, icon: 'mdi-circle'},
                isSelected: currentSpeed?.value === .75,
            },
            value: .75,
        },
        {
            props: {
                title: 'Обычная',
                icon: {size: 12, icon: 'mdi-circle'},
                isSelected: currentSpeed?.value === 1,
            },
            value: 1,
        },
        {
            props: {
                title: '1.25x',
                icon: {size: 12, icon: 'mdi-circle'},
                isSelected: currentSpeed?.value === 1.25,
            },
            value: 1.25,
        },
        {
            props: {
                title: '1.50x',
                icon: {size: 12, icon: 'mdi-circle'},
                isSelected: currentSpeed?.value === 1.50,
            },
            value: 1.50,
        },
        {
            props: {
                title: '1.75x',
                icon: {size: 12, icon: 'mdi-circle'},
                isSelected: currentSpeed?.value === 1.75,
            },
            value: 1.75,
        },
        {
            props: {
                title: '2x',
                icon: {size: 12, icon: 'mdi-circle'},
                isSelected: currentSpeed?.value === 2,
            },
            value: 2,
        },
    ]);


    // Methods
    const setSpeed = (speed) => player.value.speed = speed;

</script>


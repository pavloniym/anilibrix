<template>
    <div class="d-flex align-center">

        <!-- Title -->
        <!-- Subtitle -->
        <heading v-bind="{title, subtitle}"/>
        <v-spacer/>

        <!-- Arrows -->
        <template v-for="button in buttons">
            <v-btn v-on="button.on" v-bind="button.btn">
                <v-icon v-bind="button.icon"/>
            </v-btn>
        </template>

    </div>
</template>

<script setup>

    const props = defineProps({
        index: {type: Number, default: 0},
    })

    // Vue
    import {computed, ref} from "vue";

    // Components
    import Heading from '@components/interface/heading/Heading'

    // Composables
    import {onKeyStroke} from '@vueuse/core'
    import {useLatestReleasesStore} from "@store/latestReleases/latestReleasesStore";

    // Bindings
    const emit = defineEmits(['update:index']);
    const latestReleases = useLatestReleasesStore();

    // State
    const title = ref('Новые эпизоды')
    const subtitle = ref('Самые новые и свежие эпизоды в любимой озвучке');

    // Computed
    const hasPrev = computed(() => props.index > 0);
    const hasNext = computed(() => props.index < latestReleases?.items?.length - 1);

    // Computed
    const buttons = computed(() => [
        {
            on: {click: switchToPrevious},
            btn: {width: 20, class: ['mr-1'], minWidth: 20},
            icon: {icon: 'mdi-arrow-left'}
        },
        {
            on: {click: switchToNext},
            btn: {width: 20, minWidth: 20},
            icon: {icon: 'mdi-arrow-right'}
        }
    ])

    // Methods
    const switchToNext = () => emit('update:index', hasNext?.value ? props.index + 1 : props.index);
    const switchToPrevious = () => emit('update:index', hasPrev?.value ? props.index - 1 : props.index);

    // Keyboard events
    onKeyStroke(['ArrowLeft'], _ => switchToPrevious())
    onKeyStroke(['ArrowRight'], _ => switchToNext())

</script>


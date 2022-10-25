<template>
    <v-card flat>

        <!-- Back to section -->
        <back-to :component="backToSection"/>

        <!-- Speed items -->
        <template v-for="quality in items">
            <selector v-bind="quality.props" @click.native="() => setQuality(quality.value)"/>
        </template>
    </v-card>
</template>

<script setup>

    // Vue
    import {computed, inject, shallowRef} from "vue";

    // Composables
    import {useSettingsStore} from "@store/settings/settingsStore";

    // Components
    import BackTo from './../../_components/backTo/BackTo'
    import Selector from './../../_components/selector/Selector'

    // Sections
    import Contents from './../contents/Contents'

    // State
    const backToSection = shallowRef(Contents)

    // Bindings
    const settings = useSettingsStore();

    // Inject
    const quality = inject('quality');
    const qualities = inject('qualities');

    // Computed
    const items = computed(() => (qualities?.value || []).map(item => ({
            props: {
                title: item?.label,
                icon: {size: 12, icon: 'mdi-circle'},
                isSelected: item.type === quality?.value?.type
            },
            value: item?.type,
        })
    ));


    // Methods
    const setQuality = (quality) => settings.playerQuality = quality;

</script>


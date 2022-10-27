<template>
    <close-menu/>
    <template v-for="item in items">
        <component v-on="{...item.events}" v-bind="item.props" :is="item.is"/>
    </template>
</template>

<script setup>

    // Vue
    import {computed, inject} from "vue";

    // Composable
    import {useSettingsStore} from "@store/settings/settingsStore";

    // Components
    import Action from './../../_components/action/Action'
    import Switch from './../../_components/switch/Switch'
    import CloseMenu from '../../_components/closeMenu/CloseMenu'

    // Sections
    import Speed from './../speed/Speed'
    import Hotkeys from './../hotkeys/Hotkeys'
    import Quality from './../quality/Quality'

    // Inject
    const player = inject('player')
    const quality = inject('quality');
    const setSection = inject('setSection')
    const currentSpeed = inject('currentSpeed');

    // Bindings
    const settings = useSettingsStore();

    // Computed
    const items = computed(() => [
        {
            is: Action,
            props: {
                title: 'Скорость',
                subtitle: `${currentSpeed?.value}x`
            },
            events: {click: () => setSection(Speed)}
        },
        {
            is: Action,
            props: {
                title: 'Качество',
                subtitle: quality?.value?.label
            },
            events: {click: () => setSection(Quality)}
        },
        {
            is: Action,
            props: {title: 'Горячие клавиши'},
            events: {click: () => setSection(Hotkeys)}
        },
        {
            is: Switch,
            props: {
                title: 'Автопропуск опенинга',
                modelValue: settings.skipOpening
            },
            events: {click: () => settings.skipOpening = !settings.skipOpening}
        },
        {
            is: Switch,
            props: {
                title: 'Кнопка пропуска опенинга',
                modelValue: settings.skipOpeningButton
            },
            events: {click: () => settings.skipOpeningButton = !settings.skipOpeningButton}
        }
    ])


</script>

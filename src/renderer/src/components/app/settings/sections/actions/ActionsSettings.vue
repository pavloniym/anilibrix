<template>
    <div v-if="items.length > 1">
        <template v-for="(item, k) in items" :key="k">
            <component v-bind="item.props" :is="item.is" :class="item.classes"/>
        </template>
    </div>
</template>

<script setup>

    // Components
    import Action from '../../_components/fields/action/SettingsActionField';
    import Heading from '../../_components/fields/heading/SettingsHeadingField';

    // Vue
    import {computed} from "vue";

    // Store
    import {useAppSettingsStore} from "@store/app/settings/appSettingsStore";

    // Composables
    import {useAppWindow} from "@composables/app/window/appWindow";
    import {useAppPlatform} from '@composables/app/platform/appPlatform'

    // Store
    const appSettings = useAppSettingsStore();

    // Composables
    const {isMac} = useAppPlatform();
    const {minimizeWindow, reloadWindow, closeWindow} = useAppWindow();

    const closeShortcut = isMac.value === true ? '⌘Q' : 'Alt + Q';
    const reloadShortcut = isMac.value === true ? '⌘⇧R' : 'Ctrl + Shift + R';
    const minimizeShortcut = isMac.value === true ? '⌘M' : 'Ctrl + M';
    const fullscreenShortcut = isMac.value === true ? '⌃⌘F' : 'Ctrl + F';

    const items = computed(() => [
        {
            is: Heading,
            props: {
                title: 'Системные команды',
                subtitle: ['Некоторые полезные команды для управления приложением']
            },
            searchIgnore: true,
        },
        {
            is: Action,
            props: {
                title: 'Перезагрузить приложение',
                action: reloadWindow,
                subtitle: reloadShortcut,
                hasConfirmation: true,
            },
        },
        {
            is: Action,
            props: {
                title: 'Свернуть приложение',
                action: minimizeWindow,
                subtitle: minimizeShortcut,
                hasDivider: true,
            },
        },
        {
            is: Action,
            props: {
                title: 'Закрыть приложение',
                action: closeWindow,
                subtitle: closeShortcut,
                hasDivider: true,
                hasConfirmation: true,
            },
        },
    ]
        .filter(item => {
            return 0
                || !appSettings.searchInSettings
                || item?.searchIgnore === true
                || item?.props?.title?.toLowerCase()?.indexOf(appSettings.searchInSettings?.toLowerCase()) > -1
                || item?.props?.subtitle?.toLowerCase()?.indexOf(appSettings.searchInSettings?.toLowerCase()) > -1
        }))

</script>

<template>
    <div v-if="items.length > 1">
        <template v-for="(item, k) in items" :key="k">
            <component v-bind="item.props" :is="item.is"  :class="item.classes"/>
        </template>
    </div>
</template>

<script setup>

    // App
    import {meta, repository} from '@package'

    // Components
    import Action from '../../_components/fields/action/SettingsActionField';
    import Heading from "../../_components/fields/heading/SettingsHeadingField";

    // Vue
    import {computed} from "vue";

    // Store
    import {useSettingsStore} from "@store/settings/settingsStore";

    // Store
    const settings = useSettingsStore();

    // Computed
    const items = computed(() => [
        {
            is: Heading,
            props: {
                title: 'Полезные ссылки',
                subtitle: ['Некоторые полезные ссылки по приложению и проекту']
            },
            searchIgnore: true,
        },
        {
            is: Action,
            props: {
                title: 'Анилибрия',
                action: () => window.electron.openExternalURL(meta?.links?.anilibria),
                subtitle: meta?.links?.anilibria,
                hasDivider: true,
            },
        },
        {
            is: Action,
            props: {
                title: 'Поддержать проект',
                action: () => window.electron.openExternalURL(meta.links.donate),
                subtitle: 'Яндекс.Деньги, QIWI, PayPal',
                hasDivider: true,
            },
        },
        {
            is: Action,
            props: {
                title: 'Telegram-канал',
                action: () => window.electron.openExternalURL(meta.links.telegram),
                subtitle: '@anilibrix',
                hasDivider: true,
            },
        },
        {
            is: Action,
            props: {
                title: 'Исходный код',
                action: () => window.electron.openExternalURL(repository.url),
                subtitle: '/anilibrix',
                hasDivider: true,
            },
        },
    ]
        .filter(item => {
            return 0
                || !settings.searchInSettings
                || item?.searchIgnore === true
                || item?.props?.title?.toLowerCase()?.indexOf(settings.searchInSettings?.toLowerCase()) > -1
                || item?.props?.subtitle?.toLowerCase()?.indexOf(settings.searchInSettings?.toLowerCase()) > -1
        }))

</script>

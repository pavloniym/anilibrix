<template>
    <div v-if="items.length > 1">
        <template v-for="(item, k) in items" :key="k">
            <component v-bind="item.props" :is="item.is"  :class="item.classes"/>
        </template>
    </div>
</template>

<script>

    // App
    import {meta, repository} from '@package'

    // Components
    import Action from '../../_components/fields/action/SettingsActionField';
    import Heading from "@/renderer/src/components/app/settings/_components/fields/heading/SettingsHeadingField";

    // Store
    import {mapState} from "vuex";

    export default {
        computed: {
            ...mapState('app/settings', {_searchInSettings: s => s.searchInSettings}),

            /**
             * Get settings items
             *
             * @return array
             */
            items() {
                return [
                    {
                        is: Heading,
                        props: {
                            title: 'Полезные ссылки',
                            subtitle: ['Некоторые полезные ссылки по приложению и проекту']
                        },
                        classes: ['mb-2'],
                        searchIgnore: true,
                    },
                    {
                        is: Action,
                        props: {
                            title: 'Анилибрия',
                            action: () => require('@electron/remote').shell.openExternal(meta?.links?.anilibria),
                            subtitle: meta.links.anilibria,
                            hasDivider: true,
                        },
                    },
                    {
                        is: Action,
                        props: {
                            title: 'Поддержать проект',
                            action: () => require('@electron/remote').shell.openExternal(meta.links.donate),
                            subtitle: 'Яндекс.Деньги, QIWI, PayPal',
                            hasDivider: true,
                        },
                    },
                    {
                        is: Action,
                        props: {
                            title: 'Telegram-канал',
                            action: () => require('@electron/remote').shell.openExternal(meta.links.telegram),
                            subtitle: '@anilibrix',
                            hasDivider: true,
                        },
                    },
                    {
                        is: Action,
                        props: {
                            title: 'Исходный код',
                            action: () => require('@electron/remote').shell.openExternal(repository.url),
                            subtitle: '/anilibrix',
                            hasDivider: true,
                        },
                    },
                ]
                    .filter(item => {
                        return 0
                            || !this._searchInSettings
                            || item?.searchIgnore === true
                            || item?.props?.title?.toLowerCase()?.indexOf(this._searchInSettings?.toLowerCase()) > -1
                            || item?.props?.subtitle?.toLowerCase()?.indexOf(this._searchInSettings?.toLowerCase()) > -1
                    })
            },
        }
    }

</script>

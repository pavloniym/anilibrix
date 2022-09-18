<template>
    <div v-if="items.length > 1">
        <template v-for="(item, k) in items">
            <component v-bind="item.props" :is="item.is" :key="k" :class="item.classes"/>
        </template>
    </div>
</template>

<script>

    // Utils
    import {meta, repository} from '@package'

    // Components
    import Action from '../../_components/fields/action/SettingsActionField';
    import Heading from "@components/app/settings/_components/fields/heading/SettingsHeadingField";

    const props = {
        search: {
            type: String,
            default: null
        }
    }

    export default {
        props,
        computed: {

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
                            || !this.search
                            || item?.searchIgnore === true
                            || item?.props?.title?.toLowerCase()?.indexOf(this.search?.toLowerCase()) > -1
                            || item?.props?.subtitle?.toLowerCase()?.indexOf(this.search?.toLowerCase()) > -1
                    })
            },
        }
    }

</script>

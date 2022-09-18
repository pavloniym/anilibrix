<template>
    <div v-if="items.length > 1 && _showDevtools">
        <template v-for="(item, k) in items">
            <component v-bind="item.props" :is="item.is" :key="k" :class="item.classes"/>
        </template>
    </div>
</template>

<script>

    // Components
    import Action from '../../_components/fields/action/SettingsActionField'
    import Heading from '../../_components/fields/heading/SettingsHeadingField';

    // Store
    import {mapState} from 'vuex';

    // Handlers
    import {sendAppDevtoolsMainEvent, sendAppDevtoolsTorrentEvent} from "@main/handlers/app/appHandlers";

    const props = {
        search: {
            type: String,
            default: null
        }
    }

    export default {
        props,
        computed: {
            ...mapState('app/settings/system', {_showDevtools: s => s.showDevtools}),


            /**
             * Get items
             *
             * @return {array}
             */
            items() {
                return [
                    {
                        is: Heading,
                        props: {
                            title: 'Инструменты отладки',
                            subtitle: ['Список инструментов для отладки приложения. Предназначены, в основном, для разработчиков']
                        },
                        searchIgnore: true,
                    },
                    {
                        is: Action,
                        props: {
                            title: 'Консоль приложения',
                            action: sendAppDevtoolsMainEvent,
                        }
                    },
                    {
                        is: Action,
                        props: {
                            title: 'Консоль торрент-сервера',
                            action: sendAppDevtoolsTorrentEvent,
                            hasDivider: true,
                        }
                    },
                    {
                        is: Action,
                        props: {
                            title: 'Показать данные хранилища в консоли',
                            action: () => console.log(this.$store.state),
                            hasDivider: true,
                        }
                    },
                ]
                    .filter(item => {
                        return 0
                            || !this.search
                            || item?.searchIgnore === true
                            || item?.props?.title?.toLowerCase()?.indexOf(this.search?.toLowerCase()) > -1
                            || item?.props?.subtitle?.join('.')?.toLowerCase()?.indexOf(this.search?.toLowerCase()) > -1
                    })
            },
        }
    }

</script>

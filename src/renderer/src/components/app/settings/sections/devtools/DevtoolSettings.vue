<template>
    <div v-if="items.length > 1 && _showDevtools">
        <template v-for="(item, k) in items" :key="k">
            <component v-bind="item.props" :is="item.is"  :class="item.classes"/>
        </template>
    </div>
</template>

<script>

    // Components
    import Action from '../../_components/fields/action/SettingsActionField'
    import Heading from '../../_components/fields/heading/SettingsHeadingField';
    import UserInput from '../../_components/fields/userInput/SettingsUserInputField'

    // Store
    import {mapActions, mapState} from 'vuex';
    import {SET_SESSION_ACTION} from "@/renderer/src/store/app/account/appAccountStore";

    // Handlers
    import {sendAppDevtoolsMainEvent, sendAppDevtoolsTorrentEvent} from "@main/handlers/app/appHandlers";

    export default {
        computed: {
            ...mapState('app/account', {_session: s => s.session}),
            ...mapState('app/settings', {
                _showDevtools: s => s.showDevtools,
                _searchInSettings: s => s.searchInSettings,
            }),


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
                    {
                        is: UserInput,
                        props: {
                            title: 'Кастомная сессия',
                            value: this._session,
                            subtitle: ['Вы можете указать с произвольную сессию'],
                            inputProps: {clearable: true},
                            inputHandler: $event => this[SET_SESSION_ACTION]($event)
                        },
                        classes: ['mt-2']
                    },
                ]
                    .filter(item => {
                        return 0
                            || !this._searchInSettings
                            || item?.searchIgnore === true
                            || item?.props?.title?.toLowerCase()?.indexOf(this._searchInSettings?.toLowerCase()) > -1
                            || item?.props?.subtitle?.join('.')?.toLowerCase()?.indexOf(this._searchInSettings?.toLowerCase()) > -1
                    })
            },
        },

        methods: {
            ...mapActions('app/account', [SET_SESSION_ACTION])
        }
    }

</script>

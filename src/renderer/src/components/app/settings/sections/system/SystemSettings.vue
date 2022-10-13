<template>
    <div v-if="items.length > 1">
        <template v-for="(item, k) in items" :key="k">
            <component v-bind="item.props" :is="item.is"  :class="item.classes"/>
        </template>
    </div>
</template>

<script>

    // Components
    import Switch from '../../_components/fields/switch/SettingsSwitchField'
    import Heading from '../../_components/fields/heading/SettingsHeadingField'
    import UserInput from '../../_components/fields/userInput/SettingsUserInputField'

    // Store
    import {mapState, mapActions} from 'vuex'
    import {SET_CONNECTION_HOST_ACTION} from '@/renderer/src/store/app/settings/appSettingsStore'
    import {SET_HAS_NOTIFICATIONS_ACTION} from '@/renderer/src/store/app/settings/appSettingsStore'
    import {SET_HAS_ADS_ACTION, SET_HAS_MAXIMUM_ADS_ACTION} from '@/renderer/src/store/app/settings/appSettingsStore'
    import {SET_HAS_AUTO_UPDATES_ACTION, SET_AUTO_UPDATES_TIMEOUT_ACTION} from '@/renderer/src/store/app/settings/appSettingsStore'

    export default {
        computed: {
            ...mapState('app/settings', {
                _hasAds: s => s.hasAds === true,
                _hasMaximumAds: s => s.hasMaximumAds === true,
                _connectionHost: s => s.connectionHost,
                _hasAutoUpdates: s => s.hasAutoUpdates === true,
                _searchInSettings: s => s.searchInSettings,
                _hasNotifications: s => s.hasNotifications === true,
                _autoUpdatesTimeout: s => s.autoUpdatesTimeout,
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
                            title: 'Настройки приложения',
                            subtitle: ['В данном разделе вы можете настроить автоматическое обновление релизов, системные уведомления и другие параметры приложения']
                        },
                        searchIgnore: true,
                    },
                    {
                        is: Switch,
                        props: {
                            title: 'Показывать системные уведомления',
                            value: this._hasNotifications,
                            description: ['Если при загрузке последних релизов приложение обнаружит обновленный релиз, то оно покажет системное уведомление о новом эпизоде'],
                            inputHandler: $event => this[SET_HAS_NOTIFICATIONS_ACTION]($event)
                        },
                        classes: ['mb-2']
                    },
                    {
                        is: Switch,
                        props: {
                            title: 'Автоматическое обновление релизов',
                            value: this._hasAutoUpdates,
                            description: ['Приложение будет в фоне обновлять последние релизы, даже если оно свернуто'],
                            inputHandler: $event => this[SET_HAS_AUTO_UPDATES_ACTION]($event)
                        },
                        classes: ['mb-2']
                    },
                    {
                        is: UserInput,
                        props: {
                            title: 'Периодичность обновления релизов',
                            value: this._autoUpdatesTimeout,
                            subtitle: ['Вы можете указать с какой периодичностью приложение будет обновлять релизы в фоновом режиме'],
                            inputProps: {
                                type: 'number',
                                suffix: 'мин',
                            },
                            inputHandler: $event => this[SET_AUTO_UPDATES_TIMEOUT_ACTION]($event ? parseInt($event) : 1)
                        },
                        classes: ['mb-2']
                    },
                    {
                        is: Switch,
                        props: {
                            title: 'Показывать рекламу',
                            value: this._hasAds,
                            description: [
                                'Спасибо, что выбрали Анилибрию!',
                                'Мы понимаем, что реклама никому не нравится, но это бесплатный способ поддержать проект',
                                'Отключение рекламы - абсолютно бесплатно, но, если вы хотите поддержать нас, то оставьте рекламу включенной',
                                'Обещаем, что не будем сильно навязчивыми (✿◠‿◠)',
                            ],
                            inputHandler: $event => this[SET_HAS_ADS_ACTION]($event),
                        },
                        classes: ['mb-2']
                    },
                    {
                        is: Switch,
                        props: {
                            title: 'Показывать рекламу перед каждым эпизодом',
                            value: this._hasMaximumAds,
                            description: [
                                'Максимальная поддержка проекта!',
                                'Реклама будет показываться перед каждым просмотром любого эпизода'
                            ],
                            inputHandler: $event => this[SET_HAS_MAXIMUM_ADS_ACTION]($event),
                        },
                        classes: ['mb-2']
                    },
                    {
                        is: UserInput,
                        props: {
                            title: 'Точка подключения к API',
                            subtitle: [
                                'Вы можете использовать основной домен, если он не заблокирован вашим провайдером, или использовать дополнительные домены'
                            ],
                            value: this._connectionHost,
                            description: ['После изменения точки доступа рекомендуется перезагрузить приложение'],
                            inputHandler: $event => this[SET_CONNECTION_HOST_ACTION]($event),
                        },
                        classes: ['mb-2']
                    }
                ]
                    .filter(item => {
                        return 0
                            || !this._searchInSettings
                            || item?.searchIgnore === true
                            || item?.props?.title?.toLowerCase()?.indexOf(this._searchInSettings?.toLowerCase()) > -1
                            || item?.props?.subtitle?.join('.')?.toLowerCase()?.indexOf(this._searchInSettings?.toLowerCase()) > -1
                            || item?.props?.description?.join('.')?.toLowerCase()?.indexOf(this._searchInSettings?.toLowerCase()) > -1
                    })
            }

        },

        methods: {
            ...mapActions('app/settings', [SET_CONNECTION_HOST_ACTION]),
            ...mapActions('app/settings', [SET_HAS_NOTIFICATIONS_ACTION]),
            ...mapActions('app/settings', [SET_HAS_ADS_ACTION, SET_HAS_MAXIMUM_ADS_ACTION]),
            ...mapActions('app/settings', [SET_HAS_AUTO_UPDATES_ACTION, SET_AUTO_UPDATES_TIMEOUT_ACTION]),
        },


    }
</script>

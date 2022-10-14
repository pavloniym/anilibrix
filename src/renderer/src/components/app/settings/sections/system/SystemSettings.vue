<template>
    <div v-if="items.length > 1">
        <template v-for="(item, k) in items" :key="k">
            <component v-bind="item.props" :is="item.is" :class="item.classes"/>
        </template>
    </div>
</template>

<script setup>

    // Components
    import Switch from '../../_components/fields/switch/SettingsSwitchField'
    import Heading from '../../_components/fields/heading/SettingsHeadingField'
    import UserInput from '../../_components/fields/userInput/SettingsUserInputField'

    // Vue
    import {computed} from "vue";

    // Store
    import {useAppSettingsStore} from "@store/app/settings/appSettingsStore";

    // Store
    const appSettings = useAppSettingsStore();

    // Computed
    const items = computed(() =>
        [
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
                    modelValue: appSettings.hasNotifications,
                    description: ['Если при загрузке последних релизов приложение обнаружит обновленный релиз, то оно покажет системное уведомление о новом эпизоде'],
                    inputHandler: $event => appSettings.hasNotifications = $event
                },
                classes: ['mb-2']
            },
            {
                is: Switch,
                props: {
                    title: 'Автоматическое обновление релизов',
                    modelValue: appSettings.hasAutoUpdates,
                    description: ['Приложение будет в фоне обновлять последние релизы, даже если оно свернуто'],
                    inputHandler: $event => appSettings.hasAutoUpdates = $event
                },
                classes: ['mb-2']
            },
            {
                is: UserInput,
                props: {
                    title: 'Периодичность обновления релизов',
                    subtitle: ['Вы можете указать с какой периодичностью приложение будет обновлять релизы в фоновом режиме'],
                    modelValue: appSettings.autoUpdatesTimeout,
                    inputProps: {
                        type: 'number',
                        suffix: 'мин',
                    },
                    inputHandler: $event => appSettings.autoUpdatesTimeout = $event ? parseInt($event) : 1
                },
                classes: ['mb-2']
            },
            {
                is: Switch,
                props: {
                    title: 'Показывать рекламу',
                    modelValue: appSettings.hasAds,
                    description: [
                        'Спасибо, что выбрали Анилибрию!',
                        'Мы понимаем, что реклама никому не нравится, но это бесплатный способ поддержать проект',
                        'Отключение рекламы - абсолютно бесплатно, но, если вы хотите поддержать нас, то оставьте рекламу включенной',
                        'Обещаем, что не будем сильно навязчивыми (✿◠‿◠)',
                    ],
                    inputHandler: $event => appSettings.hasAds = $event,
                },
                classes: ['mb-2']
            },
            {
                is: Switch,
                props: {
                    title: 'Реклама перед каждым эпизодом',
                    modelValue: appSettings.hasMaximumAds,
                    description: [
                        'Максимальная поддержка проекта!',
                        'Реклама будет показываться перед каждым просмотром любого эпизода'
                    ],
                    inputHandler: $event => appSettings.hasMaximumAds = $event,
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
                    modelValue: appSettings.connectionHost,
                    description: ['После изменения точки доступа рекомендуется перезагрузить приложение'],
                    inputHandler: $event => appSettings.connectionHost = $event,
                },
                classes: ['mb-2']
            }
        ]
            .filter(item => {
                return 0
                    || !appSettings.searchInSettings
                    || item?.searchIgnore === true
                    || item?.props?.title?.toLowerCase()?.indexOf(appSettings.searchInSettings?.toLowerCase()) > -1
                    || item?.props?.subtitle?.join('.')?.toLowerCase()?.indexOf(appSettings.searchInSettings?.toLowerCase()) > -1
                    || item?.props?.description?.join('.')?.toLowerCase()?.indexOf(appSettings.searchInSettings?.toLowerCase()) > -1
            }))

</script>

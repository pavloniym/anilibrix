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
    import {useSettingsStore} from "@store/settings/settingsStore";

    // Store
    const settings = useSettingsStore();

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
                    modelValue: settings.hasNotifications,
                    description: ['Если при загрузке последних релизов приложение обнаружит обновленный релиз, то оно покажет системное уведомление о новом эпизоде'],
                    inputHandler: $event => settings.hasNotifications = $event
                },
                classes: ['mb-2']
            },
            {
                is: Switch,
                props: {
                    title: 'Автоматическое обновление релизов',
                    modelValue: settings.hasAutoUpdates,
                    description: ['Приложение будет в фоне обновлять последние релизы, даже если оно свернуто'],
                    inputHandler: $event => settings.hasAutoUpdates = $event
                },
                classes: ['mb-2']
            },
            {
                is: UserInput,
                props: {
                    title: 'Периодичность обновления релизов',
                    subtitle: ['Вы можете указать с какой периодичностью приложение будет обновлять релизы в фоновом режиме'],
                    modelValue: settings.autoUpdatesTimeout,
                    inputProps: {
                        type: 'number',
                        suffix: 'мин',
                    },
                    inputHandler: $event => settings.autoUpdatesTimeout = $event ? parseInt($event) : 1
                },
                classes: ['mb-2']
            },
           /*{
                is: Switch,
                props: {
                    title: 'Показывать рекламу',
                    modelValue: settings.hasAds,
                    description: [
                        'Спасибо, что выбрали Анилибрию!',
                        'Мы понимаем, что реклама никому не нравится, но это бесплатный способ поддержать проект',
                        'Отключение рекламы - абсолютно бесплатно, но, если вы хотите поддержать нас, то оставьте рекламу включенной',
                        'Обещаем, что не будем сильно навязчивыми (✿◠‿◠)',
                    ],
                    inputHandler: $event => settings.hasAds = $event,
                },
                classes: ['mb-2']
            },*/
            /*{
                is: Switch,
                props: {
                    title: 'Реклама перед каждым эпизодом',
                    modelValue: settings.hasMaximumAds,
                    description: [
                        'Максимальная поддержка проекта!',
                        'Реклама будет показываться перед каждым просмотром любого эпизода'
                    ],
                    inputHandler: $event => settings.hasMaximumAds = $event,
                },
                classes: ['mb-2']
            },*/
            {
                is: UserInput,
                props: {
                    title: 'Точка подключения к API',
                    subtitle: [
                        'Вы можете использовать основной домен, если он не заблокирован вашим провайдером, или использовать дополнительные домены'
                    ],
                    modelValue: settings.connectionHost,
                    description: ['После изменения точки доступа рекомендуется перезагрузить приложение'],
                    inputHandler: $event => settings.connectionHost = $event,
                },
                classes: ['mb-2']
            }
        ]
            .filter(item => {
                return 0
                    || !settings.searchInSettings
                    || item?.searchIgnore === true
                    || item?.props?.title?.toLowerCase()?.indexOf(settings.searchInSettings?.toLowerCase()) > -1
                    || item?.props?.subtitle?.join('.')?.toLowerCase()?.indexOf(settings.searchInSettings?.toLowerCase()) > -1
                    || item?.props?.description?.join('.')?.toLowerCase()?.indexOf(settings.searchInSettings?.toLowerCase()) > -1
            }))

</script>

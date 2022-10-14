<template>
    <div v-if="items.length > 1 && appSettings.showDevtools">
        <template v-for="(item, k) in items" :key="k">
            <component v-bind="item.props" :is="item.is" :class="item.classes"/>
        </template>
    </div>
</template>

<script setup>

    // Components
    import Action from '../../_components/fields/action/SettingsActionField'
    import Heading from '../../_components/fields/heading/SettingsHeadingField';
    import UserInput from '../../_components/fields/userInput/SettingsUserInputField'

    // Vue
    import {computed} from "vue";

    // Pinia
    import { getActivePinia } from "pinia"

    // Store
    import {useAppAccountStore} from "@store/app/account/appAccountStore";
    import {useAppSettingsStore} from "@store/app/settings/appSettingsStore";

    // Store
    const appAccount = useAppAccountStore();
    const appSettings = useAppSettingsStore();


    // Computed
    const items = computed(() => [
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
                action: () => window.electron.openDevtools(),
            }
        },
        {
            is: Action,
            props: {
                title: 'Показать данные хранилища в консоли',
                action: () => console.log(getActivePinia().state?.value),
                hasDivider: true,
            }
        },
        {
            is: UserInput,
            props: {
                title: 'Кастомная сессия',
                subtitle: ['Вы можете указать с произвольную сессию'],
                modelValue: appAccount.sessionId,
                inputProps: {clearable: true},
                inputHandler: $event => appAccount.sessionId = $event
            },
            classes: ['mt-2']
        },
    ]
        .filter(item => {
            return 0
                || !appSettings.searchInSettings
                || item?.searchIgnore === true
                || item?.props?.title?.toLowerCase()?.indexOf(appSettings.searchInSettings?.toLowerCase()) > -1
                || item?.props?.subtitle?.join('.')?.toLowerCase()?.indexOf(appSettings.searchInSettings?.toLowerCase()) > -1
        }))


</script>

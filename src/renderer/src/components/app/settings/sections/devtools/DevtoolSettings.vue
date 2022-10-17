<template>
    <div v-if="items.length > 1 && settings.showDevtools">
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
    import {useAccountStore} from "@store/account/accountStore";
    import {useSettingsStore} from "@store/settings/settingsStore";

    // Store
    const account = useAccountStore();
    const settings = useSettingsStore();


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
                modelValue: account.sessionId,
                inputProps: {clearable: true},
                inputHandler: $event => account.sessionId = $event
            },
            classes: ['mt-2']
        },
    ]
        .filter(item => {
            return 0
                || !settings.searchInSettings
                || item?.searchIgnore === true
                || item?.props?.title?.toLowerCase()?.indexOf(settings.searchInSettings?.toLowerCase()) > -1
                || item?.props?.subtitle?.join('.')?.toLowerCase()?.indexOf(settings.searchInSettings?.toLowerCase()) > -1
        }))


</script>

<template>
    <div v-if="items.length > 1">
        <template v-for="(item, k) in items" :key="k">
            <component v-bind="item.props" :is="item.is"  :class="item.classes"/>
        </template>
    </div>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Components
    import Switch from '../../_components/fields/switch/SettingsSwitchField'
    import Heading from '../../_components/fields/heading/SettingsHeadingField'
    import UserInput from '../../_components/fields/userInput/SettingsUserInputField'

    // Store
    import {useAppSettingsStore} from "@store/app/settings/appSettingsStore";

    // Store
    const appSettings = useAppSettingsStore();

    const items = computed(() => [
        {
            is: Heading,
            props: {
                title: 'Настройки воспроизведения релизов',
                subtitle: ['В данном разделе вы можете настроить пропуск опенингов, автоматическое воспроизведение следующего эпизода и другие настройки воспроизведения']
            },
            searchIgnore: true,
        },
        {
            is: Switch,
            props: {
                title: 'Автовоспроизведение следующего эпизода',
                modelValue: appSettings.autoplayNextEpisode,
                description: ['После окончания эпизода плеер автоматически начнет воспроизведение следующего эпизода в релизе, при его наличии'],
                inputHandler: $event => appSettings.autoplayNextEpisode = $event
            },
            classes: ['mb-2']
        },
        {
            is: UserInput,
            props: {
                title: 'Размер видео буфера',
                subtitle: ['Величина буфера подгрузки видео, по умолчанию 5 минут'],
                modelValue: appSettings.videoBufferSeconds,
                inputProps: {
                    type: 'number',
                    suffix: 'сек',
                },
                description: ['Указывает величину буфера, который плеер держит в памяти и предзагружает видео во время просмотра'],
                inputHandler: $event => appSettings.videoBufferSeconds = $event ? parseInt($event) : 60
            },
            classes: ['mb-2']
        },
        {
            is: Switch,
            props: {
                title: 'Кнопка ручного пропуска опенинга',
                modelValue: appSettings.manualOpeningSkipButton,
                description: [
                    'В интерфейсе плеера появится дополнительная кнопка, которая перемотает плеер на указанное количество секунд',
                    'Данная кнопка не гарантирует корректный пропуск опенинга'
                ],
                inputHandler: $event => appSettings.videoBufferSeconds = $event
            },
            classes: ['mb-2']
        },
        {
            is: UserInput,
            props: {
                title: 'Количество секунд для ручного пропуска опенинга',
                subtitle: ['Вы можете указать на сколько секунд пропускать опенинг'],
                modelValue: appSettings.manualOpeningSkipSeconds,
                inputProps: {
                    type: 'number',
                    suffix: 'сек',
                },
                inputHandler: $event => appSettings.videoBufferSeconds = $event ? parseInt($event) : 0
            },
            classes: ['mb-2']
        },
    ]
        .filter(item => {
            return 0
                || !appSettings.searchInSettings
                || item?.searchIgnore === true
                || item?.props?.title?.toLowerCase()?.indexOf(appSettings.searchInSettings?.toLowerCase()) > -1
                || item?.props?.subtitle?.join('.')?.toLowerCase()?.indexOf(appSettings.searchInSettings?.toLowerCase()) > -1
                || item?.props?.description?.join('.')?.toLowerCase()?.indexOf(appSettings.searchInSettings?.toLowerCase()) > -1
        }));


</script>

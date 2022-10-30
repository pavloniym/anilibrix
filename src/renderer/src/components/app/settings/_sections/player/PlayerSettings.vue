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
    import {useSettingsStore} from "@store/settings/settingsStore";

    // Store
    const settings = useSettingsStore();

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
                title: 'Автоматический пропуск опенинга',
                modelValue: settings.skipOpening,
                description: [
                    'Если для эпизода указаны границы опенинга, то плеер автоматически пропустит эту часть эпизода',
                    'Пропуск опенинга также можно переключить в настройках плеера'
                ],
                inputHandler: $event => settings.skipOpening = $event
            },
            classes: ['mb-2']
        },
        {
            is: Switch,
            props: {
                title: 'Автовоспроизведение следующего эпизода',
                modelValue: settings.autoplayNextEpisode,
                description: ['После окончания эпизода плеер автоматически начнет воспроизведение следующего эпизода в релизе, при его наличии'],
                inputHandler: $event => settings.autoplayNextEpisode = $event
            },
            classes: ['mb-2']
        },
        {
            is: UserInput,
            props: {
                title: 'Размер видео буфера',
                subtitle: ['Величина буфера подгрузки видео, по умолчанию 5 минут'],
                modelValue: settings.videoBufferSeconds,
                inputProps: {
                    type: 'number',
                    suffix: 'сек',
                },
                description: ['Указывает величину буфера, который плеер держит в памяти и предзагружает видео во время просмотра'],
                inputHandler: $event => settings.videoBufferSeconds = $event ? parseInt($event) : 60
            },
            classes: ['mb-2']
        },
        {
            is: Switch,
            props: {
                title: 'Кнопка ручной перемотки',
                modelValue: settings.manualRewindButton,
                description: [
                    'В интерфейсе плеера появится дополнительная кнопка, которая перемотает плеер на указанное количество секунд',
                    'Данная кнопка не гарантирует корректный пропуск опенинга'
                ],
                inputHandler: $event => settings.manualRewindButton = $event
            },
            classes: ['mb-2']
        },
        {
            is: UserInput,
            props: {
                title: 'Количество секунд для ручной перемотки',
                subtitle: ['Вы можете указать на сколько секунд пропускать видео по нажатию на кнопку ручной перемотки'],
                modelValue: settings.manualRewindSeconds,
                inputProps: {
                    type: 'number',
                    suffix: 'сек',
                },
                inputHandler: $event => settings.manualRewindSeconds = $event ? parseInt($event) : 0
            },
            classes: ['mb-2']
        },
    ]
        .filter(item => {
            return 0
                || !settings.searchInSettings
                || item?.searchIgnore === true
                || item?.props?.title?.toLowerCase()?.indexOf(settings.searchInSettings?.toLowerCase()) > -1
                || item?.props?.subtitle?.join('.')?.toLowerCase()?.indexOf(settings.searchInSettings?.toLowerCase()) > -1
                || item?.props?.description?.join('.')?.toLowerCase()?.indexOf(settings.searchInSettings?.toLowerCase()) > -1
        }));


</script>

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
    //import {mapState, mapActions} from 'vuex'
   // import {SET_AUTOPLAY_NEXT_EPISODE_ACTION, SET_VIDEO_BUFFER_SECONDS_ACTION} from '@/renderer/src/store/app/settings/appSettingsStore'
   // import {SET_MANUAL_OPENING_SKIP_BUTTON_ACTION, SET_MANUAL_OPENING_SKIP_SECONDS_ACTION} from '@/renderer/src/store/app/settings/appSettingsStore'

    export default {
        computed: {
           /* ...mapState('app/settings', {
                _searchInSettings: s => s.searchInSettings,
                _videoBufferSeconds: s => s.videoBufferSeconds,
                _autoplayNextEpisode: s => s.autoplayNextEpisode,
                _manualOpeningSkipButton: s => s.manualOpeningSkipButton,
                _manualOpeningSkipSeconds: s => s.manualOpeningSkipSeconds,
            }),*/

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
                            title: 'Настройки воспроизведения релизов',
                            subtitle: ['В данном разделе вы можете настроить пропуск опенингов, автоматическое воспроизведение следюущего эпизода и другие настройки воспроизведения']
                        },
                        searchIgnore: true,
                    },
                    {
                        is: Switch,
                        props: {
                            title: 'Автовоспроизведение следующего эпизода',
                            value: this._autoplayNextEpisode,
                            description: ['После окончания эпизода плеер автоматически начнет воспроизведение следующего эпизода в релизе, при его наличии'],
                            inputHandler: $event => this[SET_AUTOPLAY_NEXT_EPISODE_ACTION]($event)
                        },
                        classes: ['mb-2']
                    },
                    {
                        is: UserInput,
                        props: {
                            title: 'Размер видео буфера',
                            value: this._videoBufferSeconds,
                            subtitle: ['Величина буфера подгрузки видео, по умолчанию 5 минут'],
                            inputProps: {
                                type: 'number',
                                suffix: 'сек',
                            },
                            description: ['Указывает величину буфера, который плеер держит в памяти и предзагружает видео во время просмотра'],
                            inputHandler: $event => this[SET_VIDEO_BUFFER_SECONDS_ACTION]($event ? parseInt($event) : 60)
                        },
                        classes: ['mb-2']
                    },
                    {
                        is: Switch,
                        props: {
                            title: 'Кнопка ручного пропуска опенинга',
                            value: this._manualOpeningSkipButton,
                            description: [
                                'В интерфейсе плеера появится дополнительная кнопка, которая перемотает плеер на указанное количество секунд',
                                'Данная кнопка не гарантирует корректный пропуск опенинга'
                            ],
                            inputHandler: $event => this[SET_MANUAL_OPENING_SKIP_BUTTON_ACTION]($event)
                        },
                        classes: ['mb-2']
                    },
                    {
                        is: UserInput,
                        props: {
                            title: 'Количество секунд для ручного пропуска опенинга',
                            value: this._manualOpeningSkipSeconds,
                            subtitle: ['Вы можете указать на сколько секунд пропускать опенинг'],
                            inputProps: {
                                type: 'number',
                                suffix: 'сек',
                            },
                            inputHandler: $event => this[SET_MANUAL_OPENING_SKIP_SECONDS_ACTION]($event ? parseInt($event) : 0)
                        },
                        classes: ['mb-2']
                    },
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
           /* ...mapActions('app/settings', [SET_VIDEO_BUFFER_SECONDS_ACTION, SET_AUTOPLAY_NEXT_EPISODE_ACTION]),
            ...mapActions('app/settings', [SET_MANUAL_OPENING_SKIP_BUTTON_ACTION, SET_MANUAL_OPENING_SKIP_SECONDS_ACTION]),*/
        }

    }
</script>

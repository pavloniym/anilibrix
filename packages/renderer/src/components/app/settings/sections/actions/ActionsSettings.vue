<template>
    <div v-if="items.length > 1">
        <template v-for="(item, k) in items" :key="k">
            <component v-bind="item.props" :is="item.is" :class="item.classes"/>
        </template>
    </div>
</template>

<script>

    // Components
    import Action from '../../_components/fields/action/SettingsActionField';
    import Heading from '../../_components/fields/heading/SettingsHeadingField';

    // Store
    import {mapState} from "vuex";

    export default {
        computed: {
            ...mapState('app/settings', {_searchInSettings: s => s.searchInSettings}),

            /**
             * Get settings items
             *
             * @return array
             */
            items() {
                return [
                    {
                        is: Heading,
                        props: {
                            title: 'Системные команды',
                            subtitle: ['Некоторые полезные команды для управления приложением']
                        },
                        searchIgnore: true,
                    },
                    {
                        is: Action,
                        props: {
                            title: 'Перезагрузить приложение',
                            action: () => require('@electron/remote').getCurrentWindow().reload(),
                            subtitle: this.shortcuts['reload'],
                        },
                    },
                    {
                        is: Action,
                        props: {
                            title: 'Свернуть приложение',
                            action: () => require('@electron/remote').getCurrentWindow().minimize(),
                            subtitle: this.shortcuts['minimize'],
                            hasDivider: true,
                        },
                    },
                    {
                        is: Action,
                        props: {
                            title: 'Закрыть приложение',
                            action: () => require('@electron/remote').app.exit(0),
                            subtitle: this.shortcuts['close'],
                            hasDivider: true,
                            hasConfirmation: true,
                        },
                    },
                ]
                    .filter(item => {
                        return 0
                            || !this._searchInSettings
                            || item?.searchIgnore === true
                            || item?.props?.title?.toLowerCase()?.indexOf(this._searchInSettings?.toLowerCase()) > -1
                            || item?.props?.subtitle?.toLowerCase()?.indexOf(this._searchInSettings?.toLowerCase()) > -1
                    })
            },


            /**
             * Get actions shortcuts
             *
             * @return {object}
             */
            shortcuts() {
                return {
                    'close': process.platform === 'darwin' ? '⌘Q' : 'Alt + Q',
                    'reload': process.platform === 'darwin' ? '⌘⇧R' : 'Ctrl + Shift + R',
                    'minimize': process.platform === 'darwin' ? '⌘M' : 'Ctrl + M',
                    'fullscreen': process.platform === 'darwin' ? '⌃⌘F' : 'Ctrl + F',
                }
            }

        }

    }
</script>

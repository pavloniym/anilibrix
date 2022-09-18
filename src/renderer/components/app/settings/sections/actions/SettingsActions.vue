<template>
    <div v-if="items.length > 1">
        <template v-for="(item, k) in items">
            <component v-bind="item.props" :is="item.is" :key="k" :class="item.classes"/>
        </template>
    </div>
</template>

<script>

    // Components
    import Action from '../../_components/fields/action/SettingsActionField';
    import Heading from '../../_components/fields/heading/SettingsHeadingField';

    const props = {
        search: {
            type: String,
            default: null
        }
    }

    export default {
        props,
        computed: {


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
                            || !this.search
                            || item?.searchIgnore === true
                            || item?.props?.title?.toLowerCase()?.indexOf(this.search?.toLowerCase()) > -1
                            || item?.props?.subtitle?.toLowerCase()?.indexOf(this.search?.toLowerCase()) > -1
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

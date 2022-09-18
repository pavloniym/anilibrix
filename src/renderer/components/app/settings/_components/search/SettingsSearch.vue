<template>
    <v-text-field v-bind="options" @input="$emit('input', $event)"/>
</template>

<script>

    const props = {
        value: {
            type: String,
            default: null
        }
    }

    export default {
        props,
        computed: {

            /**
             * Get options
             *
             * @return {*}
             */
            options() {
                return {
                    solo: true,
                    value: this.value,
                    clearable: true,
                    autofocus: true,
                    hideDetails: true,
                    placeholder: 'Поиск по настройкам ...',
                    autocomplete: 'off',
                }
            }
        }
    }
</script>

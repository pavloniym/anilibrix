<template>
    <v-text-field v-bind="options" @input="setSearch"/>
</template>

<script>

    // Store
    import {mapState, mapActions} from 'vuex'
    import {SET_SEARCH_IN_SETTINGS_ACTION} from '@/renderer/src/store/app/settings/appSettingsStore'

    const props = {
        value: {
            type: String,
            default: null
        }
    }

    export default {
        computed: {
            ...mapState('app/settings', {_searchInSettings: s => s.searchInSettings}),


            /**
             * Get options
             *
             * @return {*}
             */
            options() {
                return {
                    solo: true,
                    value: this._searchInSettings,
                    clearable: true,
                    autofocus: true,
                    hideDetails: true,
                    placeholder: 'Поиск по настройкам ...',
                    autocomplete: 'off',
                }
            }
        },

        methods: {
            ...mapActions('app/settings', [SET_SEARCH_IN_SETTINGS_ACTION]),

            /**
             * Set search value to store
             *
             * @param search
             * @return {void}
             */
            setSearch(search) {
                this[SET_SEARCH_IN_SETTINGS_ACTION](search);
            }

        },

        created() {
            this.setSearch = this.$__debounce(this.setSearch, 100);
        }

    }
</script>

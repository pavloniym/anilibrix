<template>
    <div>

        <v-btn icon id="toolbar__settings" @click="toggleSettingsVisibility()">
            <v-icon>mdi-settings</v-icon>
        </v-btn>

        <v-tooltip left activator="#toolbar__settings">Настройки приложения</v-tooltip>

    </div>
</template>

<script>

    // Store
    import {mapActions, mapState} from "vuex";
    import {SET_SETTINGS_ARE_VISIBLE_ACTION} from "@/renderer/src/store/app/settings/appSettingsStore";

    export default {
        computed: {
            ...mapState('app/settings', {_settingsAreVisible: s => s.settingsAreVisible}),
        },

        methods: {
            ...mapActions('app/settings', [SET_SETTINGS_ARE_VISIBLE_ACTION]),

            /**
             * Toggle settings visibility
             *
             * @return {void}
             */
            toggleSettingsVisibility() {
                this[SET_SETTINGS_ARE_VISIBLE_ACTION](!this._settingsAreVisible);
            }
        }
    }
</script>

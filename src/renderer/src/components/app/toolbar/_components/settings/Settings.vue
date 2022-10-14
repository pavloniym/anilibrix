<template>
    <v-btn v-bind="options" @click="() => appSettings.settingsAreVisible = true">
        <v-icon icon="mdi-cog" size="18"/>
        <v-tooltip activator="parent" location="start" text="Настройки приложения"/>
    </v-btn>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Store
    import {useAppSettingsStore} from "@store/app/settings/appSettingsStore";

    // Store
    const appSettings = useAppSettingsStore();

    // Computed
    const options = computed(() => {
        return {
            size: 36,
            icon: true,
        }
    })

</script>

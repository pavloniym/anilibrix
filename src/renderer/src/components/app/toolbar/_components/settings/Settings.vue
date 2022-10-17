<template>
    <v-btn v-bind="options" @click="() => settings.settingsAreVisible = true">
        <v-icon icon="mdi-cog" size="18"/>
        <v-tooltip activator="parent" location="start" text="Настройки приложения"/>
    </v-btn>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Store
    import {useSettingsStore} from "@store/settings/settingsStore";

    // Store
    const settings = useSettingsStore();

    // Computed
    const options = computed(() => {
        return {
            size: 36,
            icon: true,
        }
    })

</script>

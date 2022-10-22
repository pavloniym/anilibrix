<template>
    <v-text-field v-model="settings.searchInSettings" v-bind="options"/>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Store
    import {useSettingsStore} from "@store/settings/settingsStore";

    // Store
    const settings = useSettingsStore();

    // Computed
    const options = computed(() => ({
        variant: 'solo',
        density: 'compact',
        disabled: settings?.settingsAreVisible === false,
        clearable: true,
        autofocus: true,
        hideDetails: true,
        placeholder: 'Поиск по настройкам ...',
        autocomplete: 'off',
    }));


</script>

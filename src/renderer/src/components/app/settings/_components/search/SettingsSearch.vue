<template>
    <v-text-field v-model="appSettings.searchInSettings" v-bind="options"/>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Store
    import {useAppSettingsStore} from "@store/app/settings/appSettingsStore";

    // Store
    const appSettings = useAppSettingsStore();

    // Computed
    const options = computed(() => ({
        variant: 'solo',
        density: 'compact',
        clearable: true,
        autofocus: true,
        placeholder: 'Поиск по настройкам ...',
        autocomplete: 'off',
    }));


</script>

<template>
    <v-list-item class="pb-2" :prepend-avatar="avatar">
        <v-list-item-title v-text="login" class="fz-.75 font-weight-bold text-line-height-1.3"/>
        <v-list-item-subtitle class="fz-.65 text-grey text-line-height-1.3">ID: {{ id }}</v-list-item-subtitle>
    </v-list-item>
    <v-divider/>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Store
    import {useAccountStore} from "@store/account/accountStore";
    import {useSettingsStore} from "@store/settings/settingsStore";

    // Store
    const account = useAccountStore();
    const settings = useSettingsStore();

    // Computed
    const id = computed(() => account?.profile?.id);
    const login = computed(() => account?.profile?.login);
    const avatar = computed(() => settings.applyToConnectionHost(account?.profile?.avatar))

</script>

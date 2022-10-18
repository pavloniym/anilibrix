<template>
    <v-btn v-bind="props.props" icon size="36" :loading="account.isLoading">
        <v-avatar size="24" color="bg-grey bg-grey-darken-3">
            <v-img v-if="avatar" :src="avatar"/>
            <span v-else class="fz-.70">{{ label }}</span>
        </v-avatar>
    </v-btn>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Store
    import {useAccountStore} from "@store/account/accountStore";
    import {useSettingsStore} from "@store/settings/settingsStore";

    // Props
    const props = defineProps({
        props: {
            type: Object,
            default: null
        },
    });

    // Store
    const account = useAccountStore();
    const settings = useSettingsStore();

    // Computed
    const label = computed(() => account?.profile?.login ? account?.profile?.login.charAt(0).toUpperCase() : 'A');
    const avatar = computed(() => settings.applyToConnectionHost(account?.profile?.avatar))

</script>

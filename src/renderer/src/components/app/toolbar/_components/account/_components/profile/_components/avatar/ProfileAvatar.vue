<template>
    <v-btn v-bind="props.props" icon size="36" :loading="account.isLoading">
        <v-avatar size="24" color="bg-grey bg-grey-darken-3" class="d-flex justify-center">
            <v-img v-if="avatar" :src="avatar"/>
            <span v-else class="fz-.70">{{ label }}</span>
        </v-avatar>
    </v-btn>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Composables
    import {useAccountStore} from "@store/account/accountStore";

    // Props
    const props = defineProps({
        props: {
            type: Object,
            default: null
        },
    });

    // Bindings
    const account = useAccountStore();

    // Computed
    const label = computed(() => account?.profile?.login ? account?.profile?.login.charAt(0).toUpperCase() : 'A');
    const avatar = computed(() => account?.profile?.avatar)

</script>

<template>
    <template v-for="(action, k) in actions" :key="k">
        <v-divider v-if="k > 0"/>
        <v-list-item @click="action.action" min-height="28">

            <!-- Icon -->
            <!-- Progress -->
            <template v-slot:prepend>
                <div class="mr-3">
                    <v-progress-circular v-if="account.isLoading" indeterminate size="16" width="2"/>
                    <v-icon v-else v-bind="action.icon"/>
                </div>
            </template>

            <!-- Title -->
            <v-list-item-subtitle v-text="action.title" class="fz-.70"/>

        </v-list-item>
    </template>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Composables
    import {useRouter} from "vue-router";
    import {useAccountStore} from "@store/account/accountStore";

    // Routes
    import {LOGIN_ROUTE} from "@router/login/loginRoutes";

    // Bindings
    const router = useRouter();
    const account = useAccountStore();

    // Computed
    const actions = computed(() => [
        {
            icon: {
                size: 16,
                icon: 'mdi-logout',
            },
            title: 'Выход',
            action: async () => {
                await account.logout();
                await router.push({name: LOGIN_ROUTE});
            },
            isLoading: account.isLoading === true
        }
    ]);


</script>

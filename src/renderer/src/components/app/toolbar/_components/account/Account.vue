<template>
    <div>
        <template v-for="(item, k) in items" :key="k">
            <component :is="item.is"/>
        </template>
    </div>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Components
    import Login from './_components/login/AccountLogin'
    import Profile from './_components/profile/AccountProfile'

    // Store
    import {useAccountStore} from "@store/account/accountStore";

    // Store
    const account = useAccountStore();

    // Computed
    const items = computed(() =>
        [
            {
                is: Login,
                isVisible: account.isAuthorized === false,
            },
            {
                is: Profile,
                isVisible: account.isAuthorized === true,
            }
        ]
            .filter(item => item.isVisible === true)
    )


</script>

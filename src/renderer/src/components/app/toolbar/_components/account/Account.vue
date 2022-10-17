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
            }
        ]
            .filter(item => item.isVisible === true)
    )


</script>

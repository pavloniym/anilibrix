<template>
    <v-btn v-bind="options">
        <v-icon icon="mdi-account" size="18"/>
        <v-tooltip activator="parent" location="start" text="Авторизация"/>
    </v-btn>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Routes
    import {LOGIN_ROUTE} from "@router/login/loginRoutes";

    // Computed
    const options = computed(() => {
        return {
            to: {name: LOGIN_ROUTE},
            size: 36,
            icon: true
        }
    })

</script>

<template>
    <v-btn v-bind="options">
        <v-icon icon="mdi-magnify" size="18"/>
        <v-tooltip activator="parent" location="start" text="Поиск"/>
    </v-btn>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Routes
    import {SEARCH_ROUTE} from "@router/search/searchRoutes";

    // Computed
    const options = computed(() => {
        return {
            to: {name: SEARCH_ROUTE},
            size: 36,
            icon: true
        }
    })

</script>

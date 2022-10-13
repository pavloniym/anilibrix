<template>
    <v-layout full-height class="d-flex align-center justify-center">
        <loader-logo class="loader"/>
    </v-layout>
</template>

<script setup>

    import LoaderLogo from './_components/logo/LoaderLogo.vue'

</script>

<style scoped lang="scss">

    .loader {
        width: 120px;
        height: 120px;
    }

</style>

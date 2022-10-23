<template>
    <div v-if="isLoading" class="d-flex align-center justify-center fetching">
        <v-btn flat icon width="80" height="80" color="rgba(0, 0, 0, 0.10)">
            <v-progress-circular indeterminate size="40" width="2"/>
        </v-btn>
    </div>
</template>

<script setup>

    // Vue
    import {inject} from "vue";

    // Inject
    const isLoading = inject('isLoading');

</script>

<style scoped lang="scss">

    .fetching {
        top: 40px;
        left: 0;
        right: 0;
        bottom: 0;
        position: fixed;
        pointer-events: none;
    }

</style>

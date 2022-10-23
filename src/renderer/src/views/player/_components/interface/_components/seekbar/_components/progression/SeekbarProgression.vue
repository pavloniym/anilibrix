<template>
    <div class="progression bg-secondary"/>
</template>

<script setup>

    // Vue
    import {inject} from "vue";

    // Inject
    const progress = inject('progress');

</script>

<style scoped lang="scss">

    .progression {
        top: 0;
        left: 0;
        width: calc(v-bind(progress) * 1%);
        height: 100%;
        z-index: 50;
        position: absolute;
        pointer-events: none;
        border-radius: inherit;
    }

</style>

<template>
    <div class="thumb bg-secondary" :class="{isOutside}"/>
</template>

<script setup>

    // Vue
    import {inject} from "vue";

    // Inject
    const progress = inject('progress');
    const isOutside = inject('isOutside');

</script>

<style scoped lang="scss">

    .thumb {
        top: 50%;
        left: calc(v-bind(progress) * 1%);
        width: 12px;
        height: 12px;
        opacity: 1;
        position: absolute;
        transition: opacity .15s ease;
        margin-top: -6px;
        margin-left: -6px;
        border-radius: 50%;

        &.isOutside {
            opacity: 0;
        }

    }

</style>

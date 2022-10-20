<template>
    <div class="clean__layout" :class="{isAbsoluteFullWindow}">
        <slot/>
    </div>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Composables
    import {useRoute} from "vue-router";

    // Bindings
    const route = useRoute();

    // Computed
    const isAbsoluteFullWindow = computed(() => route?.meta?.isAbsoluteFullWindow === true);

</script>

<style scoped lang="scss">

    .clean__layout {
        height: 100%;
        padding-top: 40px;

        &.isAbsoluteFullWindow {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            position: absolute;
        }
    }

</style>

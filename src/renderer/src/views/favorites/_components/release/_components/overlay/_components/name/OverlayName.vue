<template>
    <div class="d-flex align-center overflow-hidden name">
        <div ref="title" v-text="name" class="text-center font-weight-bold text-line-height-1.2"/>
    </div>
</template>

<script setup>

    // Vue
    import {computed, nextTick, onMounted, ref} from "vue";

    // Props
    const props = defineProps({
        release: {type: Object, default: null}
    })

    // State
    const title = ref(null);
    const height = ref(55);
    const fontSize = ref(16);

    // Computed
    const name = computed(() => props?.release?.name || props?.release?.originalName)

    // Mounted
    onMounted(() => nextTick(() => fitToHeight()))

    // Methods
    const fitToHeight = () => {

        const el = title?.value;
        const offsetHeight = el?.offsetHeight || 0;

        if (offsetHeight > height?.value) {
            fontSize.value = fontSize?.value - 0.05;
            nextTick(() => fitToHeight());
        }
    }

</script>

<style scoped lang="scss">

    .name {
        height: calc(v-bind(height) * 1px);
        min-height: calc(v-bind(height) * 1px);
        max-height: calc(v-bind(height) * 1px);

        div {
            font-size: calc(v-bind(fontSize) * 1px)
        }
    }

</style>

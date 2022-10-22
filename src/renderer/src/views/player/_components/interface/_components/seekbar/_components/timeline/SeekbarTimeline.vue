<template>
    <div class="timeline bg-grey" :class="{isOutside}">
        <slot/>
    </div>
</template>

<script setup>

    // Vue
    import {inject, ref} from "vue";

    // Composables
    import {useMouseInElement} from '@vueuse/core'

    // Inject
    const seekbar = ref(inject('seekbar'));
    const isOutside = inject('isOutside');

    // Bindings
    const {elementHeight} = useMouseInElement(seekbar);

</script>

<style scoped lang="scss">

    .timeline {
        top: calc(((v-bind(elementHeight) - 2) / 2) * 1px);
        left: 0;
        width: 100%;
        height: 6px;
        max-height: 6px;
        position: absolute;
        transition: max-height .2s ease;
        border-radius: 2px;
        pointer-events: none;

        &.isOutside {
            max-height: 2px;
        }
    }


</style>

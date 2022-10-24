<template>
    <div v-if="isVisible" class="fz-.65 bg-white rounded font-weight-bold px-1 mx-1">
        {{ currentSpeed }}x
    </div>
</template>

<script setup>

    // Vue
    import {computed, inject} from "vue";

    // Inject
    const currentSpeed = inject('currentSpeed');

    // Computed
    const isVisible = computed(() => currentSpeed?.value !== 1)

</script>

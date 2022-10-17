<template>
    <v-img cover :src="image" aspect-ratio="1" :style="{height: '100vh'}">
        <v-overlay contained persistent class="overlay" theme="light" :modelValue="true"/>
    </v-img>
</template>

<script setup>

    // Vue
    import {computed, ref} from "vue";

    // Assets
    import SAO1 from './_assets/sao1.jpg'
    import SLIME1 from './_assets/slime1.jpg'
    import SLAYER1 from './_assets/slayer1.jpg'
    import BLEACH1 from './_assets/bleach1.png'
    import FRANXX1 from './_assets/franxx1.png'
    import OVERLORD1 from './_assets/overlord1.jpg'

    // State
    const images = ref([
        SAO1,
        SLIME1,
        SLAYER1,
        BLEACH1,
        FRANXX1,
        OVERLORD1
    ]);

    // Computed
    const image = computed(() => images.value[Math.floor(Math.random() * images?.value?.length)])

</script>

<style scoped lang="scss">

    :deep(.overlay) {
        opacity: .75 !important;
        background-color: black !important;
    }

</style>

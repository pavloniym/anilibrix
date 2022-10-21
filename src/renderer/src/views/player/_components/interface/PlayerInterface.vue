<template>
    <v-slide-y-reverse-transition>
        <div v-if="1 || isVisibleInterface" class="pa-8 interface">
            <headline/>
            <seekbar/>
        </div>
    </v-slide-y-reverse-transition>
</template>

<script setup>

    // Vue
    import {inject} from "vue";

    // Components
    import Seekbar from './_components/seekbar/InterfaceSeekbar'
    import Headline from './_components/headline/InterfaceHeadline'

    // Inject
    const isVisibleInterface = inject('isVisibleInterface');

</script>

<style scoped lang="scss">

    .interface {
        width: 100%;
        bottom: 0;
        z-index: 10;
        position: absolute;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.50) 50%, rgba(255, 255, 255, 0) 100%);
        user-select: none;
    }

</style>

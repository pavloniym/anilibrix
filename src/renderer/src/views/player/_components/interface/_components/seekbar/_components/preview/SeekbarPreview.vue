<template>
    <div v-if="isHovered" class="bg-black rounded preview">
        <canvas ref="canvas" class="rounded" width="100" height="65"/>
    </div>
</template>

<script setup>


    // Vue
    import {inject, ref, watch} from "vue";

    // Inject
    const player = inject('player');
    const isHovered = inject('isHovered');
    const seekingTime = inject('seekingTime');
    const seekingProgress = inject('seekingProgress');

    // Refs
    const canvas = ref(null);

    // Watch
    watch(seekingProgress, () => {
        if (isHovered?.value === true) {
            //const context = canvas?.value?.getContext('2d');
            //context?.drawImage(video, 0, 0, 100, 65);
            //console.log({video});
        }
    })

</script>


<style scoped lang="scss">

    .preview {
        top: -70px;
        left: calc(v-bind(seekingProgress) * 1%);
        width: 100px;
        height: 65px;
        position: absolute;
        margin-left: -50px;

        canvas {
            border-radius: inherit;
        }
    }

</style>

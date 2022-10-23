<template>
    <div class="d-flex spans">
        <template v-for="span in spans">
            <div class="span bg-white" :style="span"/>
        </template>
    </div>
</template>

<script setup>

    // Vue
    import {computed, inject, nextTick, onMounted, ref} from "vue";

    // Inject
    const player = inject('player');
    const duration = inject('duration');
    const currentTime = inject('currentTime');

    // State
    const buffer = ref(null);

    // Computed
    const spans = computed(() => {
        const parts = [];
        for (let i = 0; i < buffer?.value?.length || 0; i++) {
            if (buffer?.value?.end(i) >= currentTime?.value) {

                const end = buffer?.value?.end(i) / duration?.value * 100;
                const start = buffer?.value?.start(i) / duration?.value * 100;
                const width = end - start;

                parts.push({'--start': start, '--width': width})

            }
        }
        return parts;
    });


    // Mount
    onMounted(() => {
        nextTick(() => {
            player?.value?.on('timeupdate', () => buffer.value = player?.value?.media?.buffered);
        });
    })


</script>

<style scoped lang="scss">

    .spans {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        position: absolute;

        .span {
            left: calc(var(--start) * 1%);
            width: calc(var(--width) * 1%);
            height: 100%;
            opacity: .5;
            position: absolute;
            border-radius: inherit;
        }
    }

</style>

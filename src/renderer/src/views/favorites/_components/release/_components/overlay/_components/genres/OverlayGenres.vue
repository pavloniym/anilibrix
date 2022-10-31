<template>
    <div class="d-flex flex-wrap align-center justify-center overflow-hidden" :style="{height: '25px'}">
        <template v-for="(genre, k) in genres" :key="k">
            <div class="fz-.65 text-grey text-grey-darken-1 mr-1 text-line-height-1.2" v-text="genre"/>
        </template>
    </div>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Props
    const props = defineProps({
        release: {type: Object, default: null}
    })

    // Computed
    const genres = computed(() => (props?.release?.genres || []).sort((a, b) => a?.localeCompare(b)))

</script>

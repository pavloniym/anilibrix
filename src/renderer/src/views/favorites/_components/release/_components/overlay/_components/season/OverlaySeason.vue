<template>
    <div class="d-flex align-center" :style="{minHeight: '20px', height: '20px'}">
        <template v-for="(item, k) in items" :key="k">
            <v-icon v-if="k > 0" class="mx-1" color="grey darken-2" size="4" icon="mdi-circle"/>
            <div v-text="item" class="fz-.70 grey--text text-center text-no-wrap "/>
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
    const items = computed(() =>
        [
            props?.release?.year,
            props?.release?.type,
        ]
            .filter(value => value !== null)
    )

</script>

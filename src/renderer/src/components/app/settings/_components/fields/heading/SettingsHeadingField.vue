<template>
    <div class="pa-4 pb-3 text-grey">
        <div class="text-h6 fz-1">{{ title }}</div>
        <template v-for="(item, k) in subtitle" :key="k">
            <div class="fz-.70 text-line-height-1.5">{{ item }}</div>
        </template>
    </div>
</template>

<script setup>

    const props = defineProps({
        title: {
            type: String,
            default: null
        },
        subtitle: {
            type: Array,
            default: null
        },
    })

</script>

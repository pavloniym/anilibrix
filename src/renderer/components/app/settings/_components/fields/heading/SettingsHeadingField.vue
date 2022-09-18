<template>
    <div class="pa-4 pb-3 caption grey--text">
        <div class="body-1">{{ title }}</div>
        <template v-for="(item, k) in subtitle">
            <div :key="k">{{ item }}</div>
        </template>
    </div>
</template>

<script>

    const props = {
        title: {
            type: String,
            default: null
        },
        subtitle: {
            type: Array,
            default: null
        },
    }

    export default {
        props,
    }
</script>

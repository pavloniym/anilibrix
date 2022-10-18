<template>
    <div class="message" :style="{backgroundColor: color}">
        <template v-for="(line, k) in message" :key="k">
            <div class="text-white">{{ line }}</div>
        </template>
    </div>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Props
    const props = defineProps({
        color: {
            type: String,
            default: null,
        },
        message: {
            type: [String, Array]
        }
    })

    // Computed
    const message = computed(() => {
        if (Array.isArray(props.message)) return [...props.message];
        if (typeof props.message === 'string') return [props.message]
        return [];
    });

</script>

<style scoped lang="scss">

    .message {
        padding: 18px 22px;
        font-size: .85rem;
        max-width: 400px;
        line-height: 1.3;
        font-weight: 500;
    }

</style>

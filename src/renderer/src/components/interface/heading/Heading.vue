<template>
    <div>
        <div class="font-weight-bold text-grey">
            <div v-for="line in title">{{ line }}</div>
        </div>
        <div class="fz-.75 text-grey">
            <div v-for="line in subtitle">{{ line }}</div>
        </div>
    </div>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Props
    const props = defineProps({
        title: {type: [String, Array], default: null},
        subtitle: {type: [String, Array], default: null},
    })

    // Computed
    const title = computed(() => {
        if (Array.isArray(props?.title)) return [...props?.title]
        if (typeof props?.title === 'string') return [props?.title];
    })

    // Computed
    const subtitle = computed(() => {
        if (Array.isArray(props?.subtitle)) return [...props?.subtitle]
        if (typeof props?.subtitle === 'string') return [props?.subtitle];
    })

</script>

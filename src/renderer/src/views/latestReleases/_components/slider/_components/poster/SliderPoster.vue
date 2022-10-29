<template>
    <v-card class="poster" v-bind="card" :class="{isSelected}">
        <v-img v-if="poster" cover height="100%" :src="poster" class="bg-black"/>
    </v-card>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Props
    const props = defineProps({
        release: {
            type: Object,
            default: null
        },
        isSelected: {
            type: Boolean,
            default: false
        }
    });


    // Computed
    const card = computed(() => ({
        width: '14.5vw',
        height: '34.5vh',
        minWidth: 175,
        minHeight: 250,
    }));

    // Computed
    const poster = computed(() => props.release?.poster);

</script>

<style scoped lang="scss">

    .poster {
        &.isSelected {
            :deep(.v-card__overlay) {
                opacity: 0;
            }
        }

        :deep(.v-card__overlay) {
            opacity: .85;
            background: black;
        }
    }

</style>

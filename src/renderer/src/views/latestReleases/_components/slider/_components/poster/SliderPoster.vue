<template>
    <v-card class="poster" :class="{isSelected}">
        <v-img v-bind="image" class="bg-black">
            <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular indeterminate size="70" color="grey-darken-2"/>
                </div>
            </template>
        </v-img>
    </v-card>

</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Props
    const props = defineProps({
        release: {type: Object, default: null},
        isSelected: {type: Boolean, default: false}
    });

    // Computed
    const image = computed(() => ({
        src: props.release?.poster,
        cover: true,
        width: '24vw',
        lazySrc: props.release?.poster,
        aspectRatio: 0.7,
    }));

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

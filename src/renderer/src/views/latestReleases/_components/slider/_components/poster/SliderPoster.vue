<template>
    <v-card class="poster" color="grey-darken-3" :class="{isSelected}">
        <v-img v-bind="image">
            <template v-slot:placeholder>
                <placeholder/>
            </template>
        </v-img>
    </v-card>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Components
    import Placeholder from '@components/interface/placeholders/logo/LogoPlaceholder'

    // Props
    const props = defineProps({
        release: {type: Object, default: null},
        isSelected: {type: Boolean, default: false}
    });

    // Computed
    const image = computed(() => ({
        src: props.release?.poster,
        cover: true,
        width: '26vh',
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

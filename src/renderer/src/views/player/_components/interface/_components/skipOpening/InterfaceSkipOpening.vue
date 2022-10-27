<template>
    <div v-if="isVisible" class="skipOpening d-flex align-center justify-center" @click="skipOpening">
        <div class="d-flex flex-column align-center">
            <v-icon icon="mdi-chevron-double-right" size="60"/>
            <div class="fz-.75 font-weight-bold">Пропустить</div>
        </div>
    </div>
</template>

<script setup>

    // Vue
    import {computed, inject, ref, watch} from "vue";

    // Composables
    import {useSettingsStore} from "@store/settings/settingsStore";

    // Bindings
    const settings = useSettingsStore();

    // Inject
    const player = inject('player');
    const volume = inject('volume');
    const episode = inject('episode');
    const currentTime = inject('currentTime');

    // State
    const isSkipped = ref(false);

    // Computed
    const skipTo = episode?.value?.openingSkipTo;
    const skipFrom = episode?.value?.openingSkipFrom;
    const hasSkipRange = computed(() => skipFrom >= 0 && skipTo > 0);
    const isBetweenCurrentTime = computed(() => currentTime?.value >= skipFrom && currentTime?.value <= skipTo);

    // Computed
    const isAuto = computed(() => isSkipped?.value === false && settings.skipOpening === true && hasSkipRange?.value === true && isBetweenCurrentTime?.value === true);
    const isVisible = computed(() => settings.skipOpeningButton && hasSkipRange?.value === true && isBetweenCurrentTime?.value === true);

    // Watch
    watch(isAuto, isAuto => isAuto === true ? skipOpening() : null);


    // Methods
    const skipOpening = async () => {

        // Set player time to skip end
        player.value.currentTime = skipTo;

        // Set as skipped to prevent endless skip
        isSkipped.value = true;

    };


    /*const smoothVolumeChange = async () => {

        const level = volume?.value;
        const change = (value, resolve) => setTimeout(() => (player.value.volume = value, resolve()), 500);

        const decreasing = Array.from(Array(5))
            .map((v, index) => level - (level / 5 * (index + 1)))
            .map(value => new Promise(resolve => change(value, resolve)))
        // .reduce((promise, setLevel) => promise.then(setLevel), Promise.resolve());


    }*/


</script>

<style scoped lang="scss">

    .skipOpening {
        top: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        width: 220px;
        background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.248358718487395) 15%, rgba(0, 0, 0, 1) 100%);
        background: rgb(0, 0, 0);
        background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.50) 50%, rgba(0, 0, 0, 1) 100%);
    }
</style>

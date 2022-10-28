<template>
<!--    <div class="skipOpening">
        <v-fade-transition>
            <div
                v-if="isVisible"
                v-ripple
                class="skip d-flex align-center justify-end text-unselect"
                @click="skipOpening">

                <div class="mr-8 d-flex flex-column align-center" :style="{width: '80px'}">
                    <v-icon icon="mdi-chevron-double-right" size="60"/>
                    <div class="fz-.70 text-center font-weight-bold">
                        <div>Пропустить</div>
                        <div>опенинг</div>
                    </div>
                </div>

            </div>
        </v-fade-transition>

    </div>-->
    <div class="skipOpening">

        <!-- Button -->
        <v-fade-transition>
            <v-btn v-if="isVisible" @click="skipOpening">
                <div class="fz-.75 font-weight-bold">Пропустить</div>
            </v-btn>
        </v-fade-transition>

        <!-- Curtain -->
        <!-- Visible after seek, for 1 second -->
        <v-fade-transition>
            <div v-if="curtainIsVisible" class="overlay"></div>
        </v-fade-transition>

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
    const curtainIsVisible = ref(false);

    // Computed
    const skipTo = episode?.value?.openingSkipTo;
    const skipFrom = episode?.value?.openingSkipFrom;
    const hasSkipRange = computed(() => skipFrom >= 0 && skipTo > 0);
    const isBetweenCurrentTime = computed(() => currentTime?.value >= skipFrom && currentTime?.value <= skipTo);

    // Computed
    const isAuto = computed(() => isSkipped?.value === false && settings.skipOpening === true && hasSkipRange?.value === true && isBetweenCurrentTime?.value === true);
    const isVisible = computed(() => settings.skipOpeningButton && hasSkipRange?.value === true && isBetweenCurrentTime?.value === true && currentTime?.value > skipFrom + 1);

    // Watch
    watch(isAuto, isAuto => isAuto === true ? skipOpening() : null);


    // Methods
    const skipOpening = async () => {

        // Set as skipped to prevent endless skip
        isSkipped.value = true;
        curtainIsVisible.value = true;

        // Set player time to skip end
        setTimeout(() => curtainIsVisible.value = false, 500);
        setTimeout(() => player.value.currentTime = skipTo + 1, 500)

    };

</script>

<style scoped lang="scss">

    .skipOpening {
        .overlay {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            position: fixed;
            background-color: black !important;
        }
    }
</style>

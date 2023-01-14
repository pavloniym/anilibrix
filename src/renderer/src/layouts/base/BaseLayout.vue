<template>
    <div class="base" :class="{ showScroll, isFullscreen }">
        <div class="_container">
            <app-toolbar class="mb-4"/>
            <v-main>
                <slot/>
            </v-main>
        </div>
    </div>
</template>

<script setup>

    // Components
    import AppToolbar from "@components/app/toolbar/AppToolbar";

    // Vue
    import {computed} from "vue";

    // Composables
    import {useRoute} from "vue-router";
    import {useFullscreenWindow} from "@composables/app/fullscreen/appFullscreen";

    // Bindings
    const route = useRoute();
    const {isFullscreen} = useFullscreenWindow()

    // Computed
    const showScroll = computed(() => route?.meta?.showScroll === true);

</script>

<style scoped lang="scss">

    .base {

        --windowOffset: 40px;
        --windowHeight: 100vh;
        --layoutTopPadding: 16px;
        --layoutSidePadding: 50px;
        --layoutBottomPadding: 32px;

        height: calc(var(--windowHeight) - var(--windowOffset));
        overflow: hidden;

        ._container {
            height: 100%;
            padding: var(--layoutTopPadding) var(--layoutSidePadding) var(--layoutBottomPadding) var(--layoutSidePadding);
            overflow-y: scroll;
            overflow-x: hidden;
        }

        &::-webkit-scrollbar-thumb {
            background-color: transparent;
        }

        &::-webkit-scrollbar {
            background-color: transparent;
        }


        &.isFullscreen {
            --windowOffset: 0px;
            --layoutTopPadding: 56px;
        }


        &.showScroll {
            &::-webkit-scrollbar-thumb {
                background-color: #353535;
            }

            &::-webkit-scrollbar {
                background-color: #1d1d1d;
            }
        }
    }

</style>

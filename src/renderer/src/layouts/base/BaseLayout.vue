<template>
    <div class="base" :class="{ showScroll, hasBlackBackground }">
        <div class="_container">
            <app-toolbar v-if="toolbarIsHidden === false" class="mb-4"/>
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

    // Bindings
    const route = useRoute();

    // Computed
    const showScroll = computed(() => route?.meta?.showScroll === true);
    const toolbarIsHidden = computed(() => route?.meta?.toolbarIsHidden === true);
    const hasBlackBackground = computed(() => route?.meta?.hasBlackBackground === true);

</script>

<style scoped lang="scss">

    .base {
        height: calc(100vh - 40px);
        overflow: hidden;

        ._container {
            height: 100%;
            padding: 16px 50px 32px 50px;
            overflow-y: scroll;
            overflow-x: hidden;
        }

        &::-webkit-scrollbar-thumb {
            background-color: transparent;
        }

        &::-webkit-scrollbar {
            background-color: transparent;
        }

        &.showScroll {
            &::-webkit-scrollbar-thumb {
                background-color: #353535;
            }

            &::-webkit-scrollbar {
                background-color: #1d1d1d;
            }
        }

        &.hasBlackBackground {
            background: black;
        }
    }

</style>

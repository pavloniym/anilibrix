<template>
    <div class="base__layout" :class="{ showScroll, hasBlackBackground, hasFullHeightContent }">

        <!-- App Toolbar -->
        <app-toolbar v-if="toolbarIsHidden === false" class="mb-4"/>

        <!-- Content -->

        <v-main>
            <slot/>
        </v-main>


    </div>
</template>

<script setup>

    // Components
    import AppToolbar from "@components/app/toolbar/AppToolbar";

    // Vue
    import {computed} from "vue";

    // Router
    import {useRoute} from "vue-router";

    // Computed
    const showScroll = computed(() => useRoute()?.meta?.showScroll === true);
    const toolbarIsHidden = computed(() => useRoute()?.meta?.toolbarIsHidden === true);
    const hasBlackBackground = computed(() => useRoute()?.meta?.hasBlackBackground === true);
    const hasFullHeightContent = computed(() => useRoute()?.meta?.hasFullHeightContent === true)

</script>

<style scoped lang="scss">

    .base__layout {
        height: 100vh;
        padding: 55px 30px 30px;
        min-height: 100%;
        overflow-y: scroll;

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


        &.hasFullHeightContent {
            :deep(.v-main) {
                height: calc(100% - 56px);
            }
        }
    }

</style>

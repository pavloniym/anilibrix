<template>
    <div class="base__layout" :class="{ showScroll, hasBlackBackground, isRelativeFullWindow }">

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

    // Composables
    import {useRoute} from "vue-router";

    // Bindings
    const route = useRoute();

    // Computed
    const showScroll = computed(() => route?.meta?.showScroll === true);
    const toolbarIsHidden = computed(() => route?.meta?.toolbarIsHidden === true);
    const hasBlackBackground = computed(() => route?.meta?.hasBlackBackground === true);
    const isRelativeFullWindow = computed(() => route?.meta?.isRelativeFullWindow === true)

</script>

<style scoped lang="scss">

    .base__layout {
        height: 100vh;
        padding: 55px 30px 30px;
        position: relative;
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


        &.isRelativeFullWindow {
            :deep(.v-main) {
                height: calc(100% - 56px);
            }
        }
    }

</style>

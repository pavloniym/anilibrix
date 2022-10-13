<template>
    <v-layout column id="container" class="layout" :class="{ showScroll, hasBlackBackground }">

        <!-- App Toolbar -->
        <!-- Content -->
        <app-tool-bar v-if="toolbarIsHidden === false"/>
        <slot/>

    </v-layout>
</template>

<script setup>

    // Components
    import AppToolBar from "@components/app/toolbar/AppToolBar";

    // Vue + Router
    import {computed} from "vue";
    import {useRoute} from "vue-router";

    // Computed
    const showScroll = computed(() => useRoute()?.meta?.showScroll === true);
    const toolbarIsHidden = computed(() => useRoute()?.meta?.toolbarIsHidden === true);
    const hasBlackBackground = computed(() => useRoute()?.meta?.hasBlackBackground === true);

</script>

<style lang="scss" scoped>

    .layout {
        width: 100%;
        height: 100vh;
        padding: 30px 30px;
        position: absolute;
        overflow-x: hidden;
        overflow-y: overlay;

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

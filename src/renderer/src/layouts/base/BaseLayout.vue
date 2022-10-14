<template>
    <v-layout column id="container" class="layout" :class="{ showScroll, hasBlackBackground }">

        <!-- App Toolbar -->
        <app-toolbar v-if="toolbarIsHidden === false"/>

        <!-- Content -->
        <slot/>

    </v-layout>
</template>

<script setup>

    // Components
    import AppToolbar from "@components/app/toolbar/AppToolbar";

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
        top: 40px;
        width: 100%;
        height: 100vh;
        padding: 15px 30px;
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

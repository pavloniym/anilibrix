<template>
    <div v-if="isFullscreen === false" class="px-3 panel bg-black d-flex align-center" @dblclick="maximizeWindow">
        <template v-if="isWindows">
            <v-spacer v-if="isWindows"/>
            <template v-for="(control, k) in controls" :key="k">
                <v-btn size="22" color="transparent" class=" panel__button ml-1" @click="control.action">
                    <v-icon size="15" color="grey text-grey-darken-2" :icon="control.icon"/>
                </v-btn>
            </template>
        </template>
    </div>
</template>

<script setup>

    // Vue
    import {computed} from "vue";

    // Composables
    import {useAppWindow} from "@composables/app/window/appWindow";
    import {useAppPlatform} from "@composables/app/platform/appPlatform";

    // Platforms
    const {isWindows} = useAppPlatform();

    // Window
    const {isFullscreen} = useAppWindow();
    const {closeWindow, minimizeWindow, maximizeWindow} = useAppWindow();

    const controls = computed(() => {
        return [
            {icon: 'mdi-minus', action: minimizeWindow},
            {icon: 'mdi-window-maximize', action: maximizeWindow},
            {icon: 'mdi-close', action: closeWindow},
        ]
    })

</script>

<style lang="scss" scoped>

    .panel {
        top: 0;
        width: 100%;
        height: 40px;
        z-index: 1900;
        position: absolute;
        -webkit-app-region: drag;

        &__button {
            z-index: 2000;
            user-select: none;
            -webkit-app-region: no-drag;
        }

    }

</style>

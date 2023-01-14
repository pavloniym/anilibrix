import {ref, onBeforeMount} from "vue";

const isFullscreen = ref(false);

export function useFullscreenWindow() {

    const toggleFullscreen = () => window.electron.controlWindowFullscreen.toggle();

    onBeforeMount(() => window.electron.controlWindowFullscreen.watch(state => isFullscreen.value = state === true));

    return {
        isFullscreen,
        toggleFullscreen,
    }
}

import {ref} from "vue";

export function useFullscreenWindow() {

    const isFullscreen = ref(false);
    const toggleFullscreen = () => window.electron.toggleFullscreen(true);

    return {
        isFullscreen,
        toggleFullscreen,
    }
}

import {ref} from "vue";


export function useAppWindow() {

    const isFullscreen = ref(false);

    const closeWindow = () => window.electron.controlWindowState.close();
    const minimizeWindow = () => window.electron.controlWindowState.minimize();
    const maximizeWindow = () => window.electron.controlWindowState.maximize();


    return {
        closeWindow,
        isFullscreen,
        minimizeWindow,
        maximizeWindow,
    }
}

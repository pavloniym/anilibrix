import {computed} from "vue";

export function useAppPlatform() {

    const isMac = computed(() => window.electron.platform === 'darwin');
    const isWindows = computed(() => window.electron.platform === 'win32')

    return {isMac, isWindows}
}

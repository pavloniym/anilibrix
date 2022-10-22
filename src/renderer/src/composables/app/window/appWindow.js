export function useAppWindow() {

    const closeWindow = () => window.electron.controlWindowState.close();
    const reloadWindow = () => window.electron.controlWindowState.reload();
    const minimizeWindow = () => window.electron.controlWindowState.minimize();
    const maximizeWindow = () => window.electron.controlWindowState.maximize();

    return {
        closeWindow,
        reloadWindow,
        minimizeWindow,
        maximizeWindow,
    }
}

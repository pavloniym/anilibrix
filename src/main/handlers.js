import showAppAbout from "./handlers/app/showAppAbout";
import openDevtools from './handlers/app/openDevtools';
import openExternalURL from './handlers/app/openExternalURL';
import makeHttpRequest from './handlers/http/makeHttpRequest';
import controlWindowState from './handlers/window/controlWindowState';

export const applyHandlers = () => {
    showAppAbout();
    openDevtools();
    openExternalURL();
    makeHttpRequest();
    controlWindowState();
}

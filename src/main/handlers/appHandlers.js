import showAppAbout from './app/showAppAbout';
import openDevtools from './app/openDevtools';
import openExternalUrl from './app/openExternalUrl';
import makeHttpRequest from './http/makeHttpRequest';
import controlWindowState from './window/controlWindowState';
import controlWindowFullscreen from './window/controlWindowFullscreen';

export const applyHandlers = (context) => {
    showAppAbout(context);
    openDevtools(context);
    openExternalUrl(context);
    makeHttpRequest(context);
    controlWindowState(context);
    controlWindowFullscreen(context);
}

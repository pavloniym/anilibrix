import makeHttpRequest from './handlers/http/makeHttpRequest';
import controlWindowState from './handlers/window/controlWindowState'

export const applyHandlers = () => {
    makeHttpRequest();
    controlWindowState();
}

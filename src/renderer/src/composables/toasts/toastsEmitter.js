import {getCurrentInstance, inject} from 'vue'

export const ERROR_TOAST = 'ERROR_TOAST';
export const SUCCESS_TOAST = 'SUCCESS_TOAST'

export function useToastsEmitter() {

    // Emitter
    const emitterOfInject = inject('$emitter');
    const emitterOfProperties = getCurrentInstance()?.appContext?.config?.globalProperties?.emitter;
    const emitter = emitterOfProperties || emitterOfInject;

    // Emit error and success
    const emitError = (message, options) => emitter?.emit(ERROR_TOAST, {message, options});
    const emitSuccess = (message, options) => emitter?.emit(SUCCESS_TOAST, {message, options});

    // Catch emitter events
    const catchEventOfType = (type, callback) => emitter?.on(type, callback);
    const unsubscribeEventOfType = (type, callback) => emitter?.off(type, callback);

    return {
        emitter,
        emitError,
        emitSuccess,
        catchEventOfType,
        unsubscribeEventOfType,
    }
}






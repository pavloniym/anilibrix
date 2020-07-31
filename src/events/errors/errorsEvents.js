import {EventBus} from "@plugins/vue-event-bus";

export const APP_ERROR = 'app:error';

/**
 * Send app error
 *
 * @param error
 * @return {Vue | object | Record<never, any> | Vue}
 */
export const sendError = (error) => EventBus.$emit(APP_ERROR, error);


/**
 * Catch app error
 *
 * @param callback
 * @return {Vue | object | Record<never, any> | Vue}
 */
export const catchError = (callback) => EventBus.$on(APP_ERROR, callback);


/**
 * Unsubscribe app error listener
 *
 * @param callback
 * @return {Vue | object | Record<never, any> | Vue}
 */
export const unsubscribeError = (callback) => EventBus.$off(APP_ERROR, callback);

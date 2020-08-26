/**
 * Check is main process
 *
 * @return {boolean}
 */
export const isMain = () => process.type === 'browser';


/**
 * Check if renderer process
 *
 * @return {boolean}
 */
export const isRenderer = () => process.type === 'renderer';

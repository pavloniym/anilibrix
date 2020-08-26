/**
 * Is web build
 *
 * @return {boolean}
 */
export const isWeb = () => process.env.IS_WEB === true;


/**
 * Is desktop build
 *
 * @return {boolean}
 */
export const isDesktop = () => process.env.IS_DESKTOP === true;

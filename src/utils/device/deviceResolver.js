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


/**
 * Check if app is in mobile mode
 *
 * @return {boolean}
 */
export const isMobile = () => this.$vuetify.breakpoint.smAndDown && isWeb();


/**
 * Execute callback only on web
 *
 * @param callback
 */
export const runOnWeb = (callback = null) => {
  if (isWeb() && callback) callback();
};


/**
 * Execute callback only on desktop
 *
 * @param callback
 */
export const runOnDesktop = (callback = null) => {
  if (isDesktop() && callback) callback();
};


/**
 * Execute callbacks only on relevant platforms
 *
 * @param webCallback
 * @param desktopCallback
 */
export const runOnPlatform = (webCallback = null, desktopCallback = null) => {
  if (isWeb()) runOnWeb(webCallback);
  if (isDesktop()) runOnDesktop(desktopCallback);
};

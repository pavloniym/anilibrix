/**
 * Execute callback only on web
 *
 * @param callback
 */
export const runOnWeb = (callback = null) => {
  if (process.env.IS_WEB === true && callback) callback();
};


/**
 * Execute callback only on desktop
 *
 * @param callback
 */
export const runOnDesktop = (callback = null) => {
  if (process.env.IS_DESKTOP === true && callback) callback();
};


/**
 * Execute callbacks only on relevant platforms
 *
 * @param webCallback
 * @param desktopCallback
 */
export const runOnPlatform = (webCallback = null, desktopCallback = null) => {
  runOnWeb(webCallback);
  runOnDesktop(desktopCallback);
};

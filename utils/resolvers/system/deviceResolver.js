import {isWeb, isDesktop} from "@@/utils/states/deviceStates";

/**
 * Execute callback only on web
 *
 * @param callback
 */
export const runOnWeb = (callback = null) => {
  if (isWeb() && callback) return callback();
};


/**
 * Execute callback only on desktop
 *
 * @param callback
 */
export const runOnDesktop = (callback = null) => {
  if (isDesktop() && callback) return callback();
};


/**
 * Execute callbacks only on relevant platforms
 *
 * @param webCallback
 * @param desktopCallback
 */
export const runOnPlatform = (webCallback = null, desktopCallback = null) => {
  if (isWeb()) return runOnWeb(webCallback);
  if (isDesktop()) return runOnDesktop(desktopCallback);
};

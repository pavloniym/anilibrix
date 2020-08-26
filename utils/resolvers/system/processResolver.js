import {isDesktop} from "@@/utils/states/deviceStates";
import {isMain, isRenderer} from "@@/utils/states/processStates";

// Require electron
// Only on desktop process
const electron = isDesktop() ? require('electron') : null;

/**
 * Run
 *
 * @param mainCallback
 * @param rendererCallback
 */
export const runInProcess = (mainCallback, rendererCallback) => {
  if (isMain()) runInMain(mainCallback);
  if (isRenderer()) runInRenderer(rendererCallback);
};


/**
 * Run in main
 *
 * @param callback
 */
export const runInMain = (callback) => {
  if (isMain()) callback(electron);
};


/**
 * Run in renderer
 *
 * @param callback
 */
export const runInRenderer = (callback) => {
  if (isRenderer()) callback(electron);
};

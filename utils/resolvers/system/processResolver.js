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
  if (isMain()) return runInMain(mainCallback);
  if (isRenderer()) return runInRenderer(rendererCallback);
};


/**
 * Run in main
 *
 * @param callback
 */
export const runInMain = (callback) => {
  if (isMain()) return callback(electron);
};


/**
 * Run in renderer
 *
 * @param callback
 */
export const runInRenderer = (callback) => {
  if (isRenderer()) return callback(electron);
};

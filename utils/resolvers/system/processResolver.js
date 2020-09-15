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
export const runInProcess = async (mainCallback, rendererCallback) => {
  if (isMain()) await runInMain(mainCallback);
  if (isRenderer()) await runInRenderer(rendererCallback);
};


/**
 * Run in main
 *
 * @param callback
 */
export const runInMain = async (callback) => {
  if (isMain()) await callback(electron);
};


/**
 * Run in renderer
 *
 * @param callback
 */
export const runInRenderer = async (callback) => {
  if (isRenderer()) await callback(electron);
};

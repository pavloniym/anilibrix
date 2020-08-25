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


// Require electron
// Only on desktop process
let electron = null;
if (process.env.IS_DESKTOP) electron = require('electron');


export default class ProcessResolver {


  /**
   * Run
   *
   * @param mainCallback
   * @param rendererCallback
   */
  static run(mainCallback, rendererCallback) {
    if (isMain()) this.runInMain(mainCallback);
    if (isRenderer()) this.runInRenderer(rendererCallback);
  }


  /**
   * Run in main
   *
   * @param callback
   */
  static runInMain(callback) {
    if (isMain()) callback(electron);
  }


  /**
   * Run in renderer
   *
   * @param callback
   */
  static runInRenderer(callback) {
    if (isRenderer()) callback(electron);
  }

}

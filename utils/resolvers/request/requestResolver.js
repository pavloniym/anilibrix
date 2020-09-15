// Resolvers
import {runOnPlatform} from "@@/utils/resolvers/system/deviceResolver";
import {runInMain, runInProcess, runInRenderer} from "@@/utils/resolvers/system/processResolver";

// Utils
import axios from 'axios'

export const APP_REQUEST = 'app:request';

export default class RequestResolver {

  /**
   * Make request
   * Check platform
   *
   * @param configuration
   */
  static async make(configuration) {
    let response = null;
    console.log(1);
    runOnPlatform(
      async () => null,
      async () => response = await this.makeDesktopRequest(configuration)
    );
    console.log(3);
    return response;
  }


  /**
   * Make request from desktop app
   * Use node server request instead of simple browser renderer process
   *
   * @param configuration
   */
  static async makeDesktopRequest(configuration) {
    let response = null;
    await runInRenderer(async electron => {
      await electron.ipcRenderer.invoke(APP_REQUEST, configuration).then(payload => response = payload);
    });
    console.log(2);
    return response;
  }

  /**
   * Resolve request on desktop side
   *
   * @return {Promise}
   */
  static async resolveDesktopRequest() {
    return runInMain(async electron => {
      electron.ipcMain.handle(APP_REQUEST, async (e, configuration) => {
        const {data} = await axios.request(configuration);
        return {data};
      });
    })
  }

}

// Resolvers
import {runOnPlatform} from "@@/utils/resolvers/system/deviceResolver";
import {runInRenderer} from "@@/utils/resolvers/system/processResolver";

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
    return runOnPlatform(
      async () => await axios.request(configuration),
      async () => await this.makeDesktopRequest(configuration)
    );
  }


  /**
   * Make request from desktop app
   * Use node server request instead of simple browser renderer process
   *
   * @param configuration
   */
  static async makeDesktopRequest(configuration) {
    return runInRenderer(async electron => await electron.remote.getGlobal('resolveDesktopRequest')(configuration));
  }

  /**
   * Resolve request on desktop side
   *
   * @return {Promise}
   */
  static async resolveDesktopRequest(configuration) {
    return await axios.request({...configuration});
  }

}

import path from "path";
import {app} from "electron";

export default class {

  /**
   * Set data folder
   *
   * @return void
   */
  setDataFolder() {
    app.setPath('userData', `${path.dirname(app.getPath('exe'))}/Data/`);
  };

}

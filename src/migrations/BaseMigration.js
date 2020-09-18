import videoRoutes from "@router/video/videoRoutes";

export default class BaseMigration {

  /**
   * BaseMigration constructor
   *
   * @return {void}
   */
  constructor() {
    this.vue = null;
    this.store = null;
    this.electron = null;
  }


  /**
   * Set providers
   *
   * @param store
   * @param electron
   * @param vue
   * @return {BaseMigration}
   */
  setProviders({store = null, electron = null, vue = null} = {}) {
    this.vue = vue;
    this.store = store;
    this.electron = electron;
    return this;
  }

  /**
   * Get migration name
   *
   * @return {*}
   */
  getMigrationName() {
    return null;
  }


  /**
   * Up migration
   *
   * @return {Promise}
   */
  async up() {
    //
  }


}

// Migration
import BaseMigration from "@/migrations/BaseMigration";

// Utils
import __get from 'lodash/get'
import __set from 'lodash/set'
import __cloneDeep from 'lodash/cloneDeep'

export default class FetchStoreFromFile extends BaseMigration {

  /**
   * Get migration name
   *
   * @return {string}
   */
  getMigrationName() {
    return '2020_09_19_190600_fetch_store_from_file';
  }


  /**
   * Up migration
   *
   * @return {Promise}
   */
  async up() {

    // Get app path and storage name
    const app_path = '/Users/paul/Projects/pavelshar/anilibrix'; //this.electron.remote.app.getPath('userData');
    const app_storage_name = 'anilibrix.json';

    // Get filename
    const file_content = await this.electron.remote.getGlobal('getFileContent')(`${app_path}/${app_storage_name}`);
    if (file_content) {

      // Get old store content
      // Extract store data
      const old_store_container = JSON.parse(file_content.toString());
      const old_store = old_store_container && old_store_container.anilibrix ? JSON.parse(old_store_container.anilibrix) : null;

      // Clone store
      const new_store = __cloneDeep(this.store.state);

      // Here restore data from old file store
      // Restore account details
      __set(new_store, 'app.account.userId', __get(old_store, 'app.account.userId'));
      __set(new_store, 'app.account.session', __get(old_store, 'app.account.session'));
      __set(new_store, 'app.account.profile', __get(old_store, 'app.account.profile'));

      // Restore watch data
      __set(new_store, 'app.watch.items', __get(old_store, 'app.watch.items', []));

      // Replace store with new data
      this.store.commit('REPLACE_STORE', new_store);

    }
  }
}

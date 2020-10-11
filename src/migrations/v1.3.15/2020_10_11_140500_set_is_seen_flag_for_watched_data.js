// Migration
import BaseMigration from "@/migrations/BaseMigration";

// Utils
import __get from 'lodash/get'
import __set from 'lodash/set'
import __cloneDeep from 'lodash/cloneDeep'

// Resolvers
import {runOnDesktop} from "@@/utils/resolvers/system/deviceResolver";


export default class FetchStoreFromFile extends BaseMigration {

  /**
   * Get migration name
   *
   * @return {string}
   */
  getMigrationName() {
    return '2020_10_11_140500_set_is_seen_flag_for_watched_data';
  }


  /**
   * Up migration
   *
   * @return {Promise}
   */
  async up() {
    return runOnDesktop(async () => {

      // Clone store
      // Get original watch data
      const new_store = __cloneDeep(this.store.state);
      const watch_items = {...__get(this.store.state, 'app.watch.items') || {}};

      // Rename property with is seen data
      // Set new "is_seen" property
      // Delete previous property "isSeen"
      Object
        .keys(watch_items)
        .forEach(watch_key => {

          // Set seen flag
          watch_items[watch_key].is_seen = watch_items[watch_key].isSeen;

          // Delete property
          delete watch_items[watch_key].isSeen;

        });

      // Restore watch data
      __set(new_store, 'app.watch.items', watch_items);

      // Replace store with new data
      this.store.commit('REPLACE_STORE', new_store);

    })
  }
}

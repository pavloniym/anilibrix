// Resolvers
import ErrorResolver from "@@/utils/resolvers/error";

// Migrations files
import v1_3_15 from './v1.3.15'

// States
import {isDesktop} from "@@/utils/states/deviceStates";


// Migrations order
const migrations = [
  ...v1_3_15
];


/**
 * Migrate db
 *
 * @param store
 * @param electron
 * @return {Promise<void>}
 */
export const migrateDB = async ({store}) => {

  // Require electron
  // Only on desktop process
  const electron = isDesktop() ? require('electron') : null;

  for (const Migration of migrations) {

    // Initialize migration
    // Provided store and electron
    const migration = new Migration().setProviders({store, electron});

    // Get migration name
    // Check if migration is already migrated
    const migration_name = migration.getMigrationName();
    const migration_is_new = store.state.app.migrations.findIndex(migration => migration === migration_name) === -1;

    if (migration_is_new) {

      try {

        // Up migration
        // Set
        await migration.up();
        await store.dispatch('app/resolveMigration', migration_name);

      } catch (e) {

        // Throw error
        // Break migration loop
        ErrorResolver.emitError('Проблема с миграциями БД: ' + e);
        break;

      }
    }
  }
};

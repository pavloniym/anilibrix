// Load Sentry.io handler
import * as Sentry from "@sentry/electron";
import app from "@/../package";


/**
 * Enable sentry
 *
 * @param store
 * @param process
 * @return void
 */
export default ({store, source} = {}) => {
  if (process.env.SENTRY_DSN) {

    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      release: `${app.name}@${app.version}`,
      environment: process.env.NODE_ENV,
    });

    Sentry.configureScope((scope) => {
      scope.setTag('source', source);
      scope.setUser({id: store.state.app.account.uuid})
    });

  }
}


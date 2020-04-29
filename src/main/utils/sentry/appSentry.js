// Load Sentry.io handler
import * as Sentry from "@sentry/electron";
import app from "@/../package";

/**
 * Enable sentry
 *
 * @param store
 * @return void
 */
export default ({store} = {}) => {
  if (process.env.SENTRY_DSN) {

    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      release: `${app.name}@${app.version}`,
      environment: process.env.NODE_ENV,
    });

    Sentry.configureScope((scope) => {
      scope.setTag('process', 'main');
    });

  }
}


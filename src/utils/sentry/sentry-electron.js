// Load Sentry.io handler
import * as Sentry from "@sentry/electron";

/**
 * Enable sentry
 *
 * @param store
 * @return void
 */
export default ({store} = {}) => {
  if (process.env.SENTRY_DSN) {
    Sentry.init({dsn: process.env.SENTRY_DSN});
  }
}


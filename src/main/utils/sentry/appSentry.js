// Load Sentry.io handler
import app from '@/../package';
import * as Sentry from '@sentry/electron';

/**
 * Enable sentry
 *
 * @param store
 * @param process
 * @return void
 */
export const initializeSentryInterceptor = ({ store, source } = {}) => {
  if (process.env.SENTRY_DSN && process.env.NODE_ENV !== 'development') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      release: `${app.name}@${app.version}`,
      environment: process.env.NODE_ENV
    });

    Sentry.configureScope((scope) => {
      scope.setTag('source', source);
      scope.setUser({ id: store.state.app.account.uuid })
    });
  }
}

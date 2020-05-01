import Vue from 'vue'
import * as Sentry from '@sentry/browser';
import {Vue as VueIntegration} from '@sentry/integrations';
import app from '@/../package'

/**
 * Create sentry handler
 *
 * @param store
 * @param process
 */
export default ({store, source} = {}) => {
  if (process.env.SENTRY_DSN) {

    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      release: `${app.name}@${app.version}`,
      environment: process.env.NODE_ENV,
      integrations: [new VueIntegration({Vue, attachProps: true, logErrors: true})],
    });

    Sentry.configureScope((scope) => {
      scope.setTag('source', source);
      scope.setUser({id: store.state.app.account.uuid})
    });

  }
}


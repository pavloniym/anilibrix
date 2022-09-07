import app from '@/../package'
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';

export default {
  install: (Vue, { dsn, store, source }) => {
    if (dsn && process.env.NODE_ENV !== 'development') {
      Sentry.init({
        dsn,
        release: `${app.name}@${app.version}`,
        environment: process.env.NODE_ENV,
        integrations: [new VueIntegration({ Vue, attachProps: true, logErrors: true })]
      });

      Sentry.configureScope((scope) => {
        scope.setTag('source', source);
        scope.setUser({ id: store.state.app.account.userId })
      });
    }
  }
}

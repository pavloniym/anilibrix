import Vue from 'vue'
import * as Sentry from '@sentry/browser';
import {Vue as VueIntegration} from '@sentry/integrations';
import app from '@/../package'

export default () => {
  if (process.env.SENTRY_DSN) {

    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      release: `${app.name}@${app.version}`,
      environment: process.env.NODE_ENV,
      integrations: [new VueIntegration({Vue, attachProps: true, logErrors: true})],
    });

    Sentry.configureScope((scope) => {
      scope.setTag('process', 'vue');
    });
  }
}


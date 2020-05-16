import VueYandexMetrika from 'vue-yandex-metrika'

import app from '@/../package'
import __get from 'lodash/get'

export default {
  install: (Vue, {id, store, router}) => {

    Vue.use(VueYandexMetrika, {
      id,
      router,
      env: process.env.NODE_ENV,
      options: {
        params: {
          userId: __get(store, 'state.app.account.userId'),
          version: app.version,
          autoplayNext: __get(store, 'state.app.settings.player.autoplayNext'),
          playerQuality: __get(store, 'state.app.settings.player.quality'),
          connectionHost: __get(store, 'state.app.settings.connection.host'),
          connectionType: __get(store, 'state.app.settings.connection.proxy.type'),
          firebaseSyncing: __get(store, 'state.app.settings.system.firebase.sync'),
          autoRefreshUsage: __get(store, 'state.app.settings.system.updates.enabled'),
          autoRefreshTimeout: __get(store, 'state.app.settings.system.updates.timeout'),
          torrentsProcessing: __get(store, 'state.app.settings.player.torrents.process'),
        },
        webvisor: true,
        clickmap: true,
        trackHash: true,
        userParams: {
          UserID: __get(store, 'state.app.account.userId'),
        },
        accurateTrackBounce: true,
      }
    })

  }
}

import VueYandexMetrika from 'vue-yandex-metrika'

import app from '@/../package'
import __get from 'lodash/get'


/**
 * Get store parameters
 *
 * @param store
 * @return {{}}
 */
const getParams = ({store}) => {
  return {
    userId: __get(store, 'state.app.account.userId'),
    version: app.version,
    settings: {
      player: {
        quality: __get(store, 'state.app.settings.player.quality'),
        torrents: {
          process: __get(store, 'state.app.settings.player.torrents.process')
        },
        autoplayNext: __get(store, 'state.app.settings.player.autoplayNext')
      },
      system: {
        firebase: {
          sync: __get(store, 'state.app.settings.system.firebase.sync'),
        },
        updates: {
          enabled: __get(store, 'state.app.settings.system.updates.enabled'),
          timeout: __get(store, 'state.app.settings.system.updates.timeout'),
        }
      },
      connection: {
        host: __get(store, 'state.app.settings.connection.host'),
        proxy: {
          type: __get(store, 'state.app.settings.connection.proxy.type')
        }
      }
    },
  }
};


export default {
  install: (Vue, {id, store, router}) => {

    Vue.use(VueYandexMetrika, {
      id,
      router,
      env: process.env.NODE_ENV,
      options: {
        params: getParams({store}),
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

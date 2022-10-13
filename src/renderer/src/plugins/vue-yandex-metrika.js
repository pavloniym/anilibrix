import VueYandexMetrika from '@/renderer/src/plugins/vue-yandex-metrika'

import app from '@package'
import __get from 'lodash/get'

export default {
  install: (Vue, { id, store, router }) => {

    const USER_ID = __get(store, 'state.app.account.userId');
    const AUTOPLAY_NEXT = __get(store, 'state.app.settings.player.autoplayNext') ? 1 : 0;
    const PLAYER_QUALITY = __get(store, 'state.app.settings.player.quality');
    const CONNECTION_HOST = __get(store, 'state.app.settings.connection.host');
    const CONNECTION_TYPE = __get(store, 'state.app.settings.connection.proxy.type');
    const AUTO_REFRESH = __get(store, 'state.app.settings.system.hasAutoUpdated') ? 1 : 0;
    const AUTO_REFRESH_TIMEOUT = __get(store, 'state.app.settings.system.autoUpdatesTimeout') || 0;
    const TORRENTS = __get(store, 'state.app.settings.player.torrents.process') ? 1 : 0;
    const NOTIFICATIONS = __get(store, 'state.app.settings.system.hasNotifications') ? 1 : 0;
    const ADS = __get(store, 'state.app.settings.system.hasAds') ? 1 : 0;
    const ADS_MAXIMUM = __get(store, 'state.app.settings.hasMaximumAds') ? 1 : 0;
    const DEVTOOLS = __get(store, 'state.app.settings.system.showDevtools') ? 1 : 0;

    if (id) {
      Vue.use(VueYandexMetrika, {
        id,
        router,
        env: process.env.NODE_ENV,
        options: {
          params: {
            [`userId:${USER_ID}`]: true,
            [`version:${app.version}`]: true,
            [`autoplay:next:${AUTOPLAY_NEXT}`]: true,
            [`player:quality:${PLAYER_QUALITY}`]: true,
            [`connection:host:${CONNECTION_HOST}`]: true,
            [`connection:type:${CONNECTION_TYPE}`]: true,
            [`auto:refresh:${AUTO_REFRESH}`]: true,
            [`auto:refresh:timeout:${AUTO_REFRESH_TIMEOUT}`]: true,
            [`torrents:${TORRENTS}`]: true,
            [`notifications:${NOTIFICATIONS}`]: true,
            [`ads:${ADS}`]: true,
            [`ads:maximum:${ADS_MAXIMUM}`]: true,
            [`devtools:${DEVTOOLS}`]: true
          },
          webvisor: true,
          clickmap: true,
          trackHash: true,
          userParams: { UserID: USER_ID },
          accurateTrackBounce: true
        }
      })
    }
  }
}

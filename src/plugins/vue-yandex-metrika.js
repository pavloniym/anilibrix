// Plugins
import VueYandexMetrika from 'vue-yandex-metrika'

// App
import {version} from '@/../package'

// Utils
import __get from 'lodash/get'

export default {
  install(Vue, {yandex_tracking_id, store}) {

    // Get account
    const getAccountStoreValue = (key) => __get(store, `state.app.account.${key}`);
    const getSettingsStoreValue = (key) => __get(store, `state.app.settings.${key}`);

    // Account constants
    const USER_ID = getAccountStoreValue('userId');
    const USER_IS_AUTHORIZED = (getAccountStoreValue('profile.id') !== null) ? 1 : 0;

    // Settings app
    const SETTINGS_APP_DEVTOOLS = getSettingsStoreValue('app.devtools') ? 1 : 0;
    const SETTINGS_APP_NOTIFICATIONS_SYSTEM = getSettingsStoreValue('app.notifications.system') ? 1 : 0;

    // Settings ads
    const SETTINGS_ADS_ENABLED = getSettingsStoreValue('ads.is_enabled') ? 1 : 0;
    const SETTINGS_ADS_MAXIMUM = getSettingsStoreValue('ads.is_maximum') ? 1 : 0;

    // Settings player
    const SETTINGS_PLAYER_QUALITY = getSettingsStoreValue('player.quality');
    const SETTINGS_PLAYER_TORRENTS_ENABLED = getSettingsStoreValue('player.torrents.is_enabled') ? 1 : 0;

    // If yandex tracking is provided
    if (yandex_tracking_id) {

      Vue.use(VueYandexMetrika, {
        id: yandex_tracking_id,
        env: 'production', //process.env.NODE_ENV,
        options: {
          params: {

            // Account parameters
            [`profile:user_id:${USER_ID}`]: true,
            [`profile:user_is_authorized:${USER_IS_AUTHORIZED}`]: true,

            // App parameters
            [`app:version:${version}`]: true,

            // Settings app
            [`settings:app:devtools:${SETTINGS_APP_DEVTOOLS}`]: true,
            [`settings:app:notifications:system${SETTINGS_APP_NOTIFICATIONS_SYSTEM}`]: true,

            // Settings ads
            [`settings:ads:enabled:${SETTINGS_ADS_ENABLED}`]: true,
            [`settings:ads:maximum:${SETTINGS_ADS_MAXIMUM}`]: true,

            // Settings player
            [`settings:player:quality:${SETTINGS_PLAYER_QUALITY}`]: true,
            [`settings:player:torrents:enabled:${SETTINGS_PLAYER_TORRENTS_ENABLED}`]: true,
          },
          trackHash: true,
          userParams: {UserID: USER_ID},
          accurateTrackBounce: true,
        }
      })
    }

    Vue.prototype.$visit = (path, title = null, parameters = {}) => Vue.$metrika
      ? Vue.prototype.$metrika.hit(path, {title, ...parameters})
      : null;

  }
}

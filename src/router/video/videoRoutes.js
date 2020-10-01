// Router and store
import store from '@store'
import router from "@router/index";

// Components
import VideoView from '@views/video'
import VideoLayout from "@layouts/video";

// Utils
import __get from 'lodash/get'

// Routes
import {ADS_ROUTE_NAME} from "./../ads/adsRoutes";


export const VIDEO_ROUTE_NAME = 'video';


/**
 * Push to video
 *
 * @return {Promise<Route>}
 */
export const toVideo = (release_id, episode_id) => {
  return router.push({
    name: VIDEO_ROUTE_NAME,
    params: {anchor: release_id + ':' + episode_id}
  });
};


export default [
  {
    name: VIDEO_ROUTE_NAME,
    path: '/video/:anchor/',
    meta: {
      layout: {
        is: VideoLayout
      }
    },
    props: true,
    component: VideoView,
    beforeEnter(to, from, next) {

      // Check if it is allowed to show ads
      // Check if not form ads
      const ads = __get(store, 'state.app.settings.ads.enabled') === true;
      const ads_maximum = __get(store, 'state.app.settings.system.ads.maximum') === true;

      const from_ads = from && from.name === 'ads';
      const is_shown_this_time = Math.random() >= 0.5 || ads_maximum;

      // Redirect to ads view or to episode video
      if (ads && is_shown_this_time && !from_ads) {

        // Need to show ads this time
        // Push to video
        next({name: ADS_ROUTE_NAME, params: {to}})

      } else {

        // This time without ads
        // Go to video
        next()
      }
    },
  }
]

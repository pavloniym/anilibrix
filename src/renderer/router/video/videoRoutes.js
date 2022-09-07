import store from '@store'
import VideoView from '@views/video'
import VideoLayout from '@layouts/video';

export default [
  {
    name: 'video',
    path: '/video/:key/:releaseName',
    meta: { layout: { is: VideoLayout } },
    props: true,
    component: VideoView,
    beforeEnter (to, from, next) {
      // Check if it is allowed to show ads
      // Check if not form ads
      const ads = store.state.app.settings.system.ads.enabled === true;
      const adsMaximum = store.state.app.settings.system.ads.maximum === true;

      const fromAds = from && from.name === 'ads';
      const isShownThisTime = Math.random() >= 0.5 || adsMaximum;

      // Redirect to ads view or to episode video
      if (ads && isShownThisTime && !fromAds) {
        // Need to show ads this time
        // Push to video
        next({ name: 'ads', params: { to } })
      } else {
        // This time without ads
        // Go to video
        next()
      }
    }
  }
]

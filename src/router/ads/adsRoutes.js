// Router
import router from '@router'

// Components
import AdsView from "@views/ads";

// Route name
export const ADS_ROUTE_NAME = 'ads';

export default [
  {
    name: ADS_ROUTE_NAME,
    path: '/ads',
    props: true,
    meta: {
      layout: {
        is_on_black: true
      }
    },
    component: AdsView,
  }
]

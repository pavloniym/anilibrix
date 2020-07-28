import AdsView from "@views/ads";

export default [
  {
    name: 'ads',
    path: '/ads',
    props: true,
    meta: {layout: {is_on_black: true}},
    component: AdsView,
  }
]

export default [
  {
    name: 'favorites',
    path: '/favorites',
    meta: {layout: {show_scroll: true}},
    props: true,
    component: () => import('@views/favorites'),
  }
]

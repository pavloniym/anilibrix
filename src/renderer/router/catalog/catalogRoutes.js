export default [
  {
    name: 'catalog',
    path: '/catalog',
    meta: {layout: {show_scroll: true}},
    props: true,
    component: () => import('@views/catalog'),
  }
]

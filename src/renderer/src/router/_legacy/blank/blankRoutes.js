export default [
  {
    name: 'blank',
    path: '/blank',
    props: true,
    meta: {
      layout: {
        hide_scroll: true,
        hide_toolbar: true
      }
    },
    component: () => import('@/renderer/src/views/blank')
  }
]

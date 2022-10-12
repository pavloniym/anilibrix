export default [
  {
    name: 'release',
    path: '/release/:releaseId/:releaseName',
    meta: { layout: { show_scroll: true } },
    props: true,
    component: () => import('@/renderer/src/views/release')
  }
]

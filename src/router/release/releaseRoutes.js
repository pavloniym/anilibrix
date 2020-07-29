export default [
  {
    name: 'release',
    path: '/release/:releaseId/:releaseName',
    props: true,
    component: () => import('@views/release')
  }
]

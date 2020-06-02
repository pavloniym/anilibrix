export default [
  {
    name: 'release',
    path: '/release/:releaseId/:releaseName',
    component: () => import('@views/release'),
    props: true
  }
]

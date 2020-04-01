export default [
  {
    name: 'release',
    path: '/release/:releaseId',
    component: () => import('@views/release'),
    props: true
  }
]

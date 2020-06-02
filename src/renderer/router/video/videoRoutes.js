export default [
  {
    name: 'video',
    path: '/video/:key/:releaseName',
    component: () => import('@views/video'),
    props: true,
  }
]

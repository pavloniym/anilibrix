export default [
  {
    name: 'video',
    path: '/video/:key',
    component: () => import('@views/video'),
    props: true,
  }
]

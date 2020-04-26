export default [
  {
    name: 'player',
    path: '/player/:key',
    component: () => import('@views/player'),
    props: true,
  },
  {
    name: 'player.source.empty',
    path: '/player/sources/empty',
    component: () =>import('@views/player/sources/empty')
  }
]

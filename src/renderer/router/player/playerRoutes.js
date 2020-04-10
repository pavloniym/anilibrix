export default [
  {
    name: 'player',
    path: '/player',
    component: () => import('@views/player'),
  },
  {
    name: 'player.source.empty',
    path: '/player/sources/empty',
    component: () =>import('@views/player/sources/empty')
  }
]

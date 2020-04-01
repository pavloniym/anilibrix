export default [
  {
    name: 'player',
    path: '/player',
    component: () => import('@views/player')
  },
  {
    name: 'player.no-source',
    path: '/player/no-source',
    component: () =>import('@views/player/no-source')
  }
]

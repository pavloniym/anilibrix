import { StreamPlayerView } from '@views/player'

export default [
  {
    name: 'player.stream',
    path: '/player/:sd?/:hd?/:fhd?/',
    component: StreamPlayerView,
    props: true
  }
]

import PlayerView from '@views/player/PlayerView'
import CleanLayout from "@layouts/clean/CleanLayout";

export const PLAYER_ROUTE = 'PLAYER_ROUTE';

export default [
    {
        name: PLAYER_ROUTE,
        path: '/player/:releaseId/:episodeId',
        meta: {
            layoutComponent: CleanLayout,
            isAbsoluteFullWindow: true,
        },
        props: true,
        component: PlayerView,
    }
]

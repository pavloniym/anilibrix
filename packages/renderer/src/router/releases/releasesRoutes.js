export const RELEASES_ROUTE = 'RELEASES_ROUTE';

export default [
    {
        name: RELEASES_ROUTE,
        path: '/',
        component: () => import('@views/releases/ReleasesView')
    }
]

export const RELEASES_ROUTE = 'RELEASES_ROUTE';

export default [
    {
        name: RELEASES_ROUTE,
        path: '/',
        meta: {
            showScroll: true,
            hasFullHeightContent: true
        },
        component: () => import('@views/releases/LatestReleasesView')
    }
]

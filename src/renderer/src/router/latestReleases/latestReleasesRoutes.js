import LatestReleasesView from '@views/latestReleases/LatestReleasesView'

export const LATEST_RELEASES_ROUTE = 'LATEST_RELEASES_ROUTE';

export default [
    {
        name: LATEST_RELEASES_ROUTE,
        path: '/',
        meta: {
            showScroll: true,
        },
        component: LatestReleasesView
    }
]

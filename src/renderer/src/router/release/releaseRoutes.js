export const RELEASE_ROUTE = 'RELEASE_ROUTE';

export default [
    {
        name: RELEASE_ROUTE,
        path: '/release/:releaseId',
        props: true,
        component: () => import('@views/release/ReleaseView')
    }
]

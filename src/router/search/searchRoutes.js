import router from '@router'

export const SEARCH_ROUTE_NAME = 'search';

/**
 * Push to search page
 *
 * @return {Promise<Route>}
 */
export const toSearch = () => router.push({name: SEARCH_ROUTE_NAME});


export default [
  {
    name: SEARCH_ROUTE_NAME,
    path: '/search',
    meta: {
      toolbar: {title: 'Поиск релизов'}
    },
    props: true,
    component: () => import('@views/search'),

  }
]

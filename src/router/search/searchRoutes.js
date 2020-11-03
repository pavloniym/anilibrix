// Router
import router from '@router'

// Routes
export const SEARCH_ROUTE_NAME = 'app.search';


/**
 * Push to search view
 *
 * @return {Promise<Route>}
 */
export const toSearch = () => router.push({name: SEARCH_ROUTE_NAME});


export default [
  {
    path: '/search',
    name: SEARCH_ROUTE_NAME,
    meta: {
      layout: {
        toolbar_title: 'Поиск релизов',
        toolbar_hide_back: true,
      }
    },
    component: () => import('@views/search'),

  }
]

// Router
import router from '@router'

// Route name
export const BLANK_ROUTE_NAME = 'blank';

/**
 * Push to blank
 *
 * @return {*}
 */
export const toBlank = (message) => router.push({name: BLANK_ROUTE_NAME, params: {message}});

export default [
  {
    name: BLANK_ROUTE_NAME,
    path: '/blank',
    meta: {
      layout: {
        hide_scroll: true,
        toolbar_is_hidden: true,
      }
    },
    props: true,
    component: () => import('@views/blank'),
  }
]

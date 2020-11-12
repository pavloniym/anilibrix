// Router
import router from '@router'

// Routes
export const APP_SETTINGS_ROUTE_NAME = 'app.settings';


/**
 * Push to settings view
 *
 * @return {Promise<Route>}
 */
export const toSettings = () => router.push({name: APP_SETTINGS_ROUTE_NAME});


export default [
  {
    path: '/app/settings',
    name: APP_SETTINGS_ROUTE_NAME,
    meta: {
      layout: {
        toolbar_title: 'Настройки',
        toolbar_hide_back: true,
      }
    },
    component: () => import('@views/app/settings')
  },

]

// Router
import router from '@router'

// Routes
export const APP_LOGIN_ROUTE_NAME = 'app.login';
export const APP_SETTINGS_ROUTE_NAME = 'app.settings';

/**
 * Push to login view
 *
 * @return {Promise<Route>}
 */
export const toLogin = () => router.push({name: APP_LOGIN_ROUTE_NAME});


/**
 * Push to settings view
 *
 * @return {Promise<Route>}
 */
export const toSettings = () => router.push({name: APP_SETTINGS_ROUTE_NAME});


export default [
  {
    path: '/app/login',
    name: APP_LOGIN_ROUTE_NAME,
    component: () => import('@views/app/login')
  },
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

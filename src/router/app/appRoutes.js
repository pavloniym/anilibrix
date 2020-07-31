import router from '@router'


export const APP_LOGIN_ROUTE_NAME = 'app.login';

/**
 * Push to login view
 *
 * @return {Promise<Route>}
 */
export const toLogin = () => router.push({name: APP_LOGIN_ROUTE_NAME});


export default [
  {
    path: '/app/login',
    name: APP_LOGIN_ROUTE_NAME,
    component: () => import('@views/app/login')
  }
]

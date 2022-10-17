// Layouts
import CleanLayout from "@layouts/clean/CleanLayout";

export const LOGIN_ROUTE = 'LOGIN_ROUTE';

export default [
    {
        name: LOGIN_ROUTE,
        path: '/login',
        meta: {
            layoutComponent: CleanLayout,
        },
        component: () => import('@views/login/LoginView'),
    }
]

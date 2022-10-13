export default [
    {
        name: 'account.login',
        path: '/account/login',
        meta: {layout: {hide_scroll: true}},
        component: () => import('@/renderer/src/views/account/login')
    }
]

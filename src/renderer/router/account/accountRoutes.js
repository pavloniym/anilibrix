export default [
  {
    name: 'account.login',
    path: '/account/login',
    meta: {layout: {hide_scroll: true}},
    component: () => import('@views/account/login')
  }
]


const routes = [
  {
    path: '*',
    component: () => import('layouts/logged.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/lgHome.vue') },
      { path: '/login', name: 'login', component: () => import('pages/login.vue') }
    ]
  }, {
    path: '/room',
    component: () => import('layouts/logged.vue'),
    children: [
      { path: '', name: 'lg-home', component: () => import('pages/lgHome') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

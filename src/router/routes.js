
const routes = [
  {
    path: '*',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index.vue') },
      { path: '/login', name: 'login', component: () => import('pages/login.vue') }
    ]
  }, {
    path: '/room',
    component: () => import('layouts/logged.vue'),
    children: [
      { path: '', name: 'lg-home', component: () => import('pages/lgHome.vue') },
      { path: '/equipment-info', name: 'equipment-info', component: () => import('pages/equipInfo.vue') }
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

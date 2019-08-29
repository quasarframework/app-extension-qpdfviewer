
const routes = [
  {
    path: '/',
    redirect: '/docs'
  },
  {
    path: '/docs',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/examples',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Examples.vue') }
    ]
  }
  // {
  //   path: '/',
  //   component: () => import('layouts/MyLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') },
  //     { path: 'page2', component: () => import('pages/Page2.vue') },
  //     { path: 'page3', component: () => import('pages/Page3.vue') },
  //     { path: 'page4', component: () => import('pages/Page4.vue') },
  //     { path: 'page5', component: () => import('pages/Page5.vue') },
  //     { path: '*', component: () => import('pages/Error404.vue') }
  //   ]
  // }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

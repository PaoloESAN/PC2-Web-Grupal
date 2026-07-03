const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('@/pages/IndexPage.vue') },
      { path: 'comparativa', component: () => import('@/pages/ComparativaPage.vue') },
      { path: 'dashboard', component: () => import('@/pages/DashboardPage.vue') },
      { path: 'compras', component: () => import('@/pages/ComprasPage.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
]

export default routes

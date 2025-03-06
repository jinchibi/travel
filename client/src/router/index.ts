import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          path: '/home/board',
          name: 'board',
          component: () => import('@/views/board/index.vue'),
        },
        {
          path: '/home/multimodal',
          name: 'multimodal',
          component: () => import('@/views/multimodal/index.vue'),
        },
        {
          path: '/home/classification',
          name: 'classification',
          component: () => import('@/views/multimodal/classification.vue'),
        },
        {
          path: '/home/attractions',
          name: 'attractions',
          component: () => import('@/views/attractions/index.vue'),
        },
        {
          path: '/home/notes',
          name: 'notes',
          component: () => import('@/views/notes/index.vue'),
        },
        {
          path: '/home/recommendation',
          name: 'recommendation',
          component: () => import('@/views/recommendation/index.vue'),
        },
        {
          path: '/home/analysis',
          name: 'analysis',
          component: () => import('@/views/analysis/index.vue'),
        },
        {
          path: '/home/visualization',
          name: 'visualization',
          component: () => import('@/views/visualization/index.vue'),
        },
        {
          path: '/home/orders',
          name: 'orders',
          component: () => import('@/views/orders/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register/index.vue'),
    },
  ],
})

export default router

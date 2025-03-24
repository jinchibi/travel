import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/index.vue'),
      redirect: '/home/pic2video',
      children: [
        {
          path: '/home/pic2video',
          name: 'pic2video',
          component: () => import('@/views/pic2video/index.vue'),
        },
        {
          path: '/home/erase',
          name: 'erase',
          component: () => import('@/views/erase/index.vue'),
        },
        {
          path: '/home/multimodal',
          name: 'multimodal',
          component: () => import('@/views/multimodal/index.vue'),
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

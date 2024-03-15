import { createRouter, createWebHistory } from 'vue-router'

const Layout = () => import('@/Layout/index.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: '/post',
          component: () => import('@/views/Post/index.vue')
        },
        {
          path: '/notice',
          component: () => import('@/views/Notice/index.vue')
        },
        {
          path: '/mine',
          component: () => import('@/views/Mine/index.vue')
        }
      ]
    }
  ]
})

export default router

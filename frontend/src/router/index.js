import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/displays',
    name: 'Displays',
    component: () => import('@/views/Displays.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/displays/:id/layout',
    name: 'DisplayLayout',
    component: () => import('@/views/DisplayLayout.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/displays/:id/preview',
    name: 'DisplayPreview',
    component: () => import('@/views/DisplayPreview.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/display/:id',
    name: 'DisplayView',
    component: () => import('@/views/DisplayView.vue'),
  },
  {
    path: '/slideshows',
    name: 'Slideshows',
    component: () => import('@/views/Slideshows.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/slideshows/:id',
    name: 'SlideshowDetail',
    component: () => import('@/views/SlideshowDetail.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
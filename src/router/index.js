import DashboardLayout from '@/layout/DashboardLayout.vue'
import Home from '@/views/home/Main.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'dashboardLayout',
      component: DashboardLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
        },

      ]
    },

  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/users/Login.vue'
import Balance from '@/views/users/Balance.vue';
import Update from '@/views/users/Update.vue';
import NotFound from '@/NotFound.vue';
import useUserStore from '../store/useUserStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: LoginView,
      beforeEnter: async () => {
        const loggedIn = await useUserStore.getState().getLoggedInUser();
        if (loggedIn) return { path: 'Balance' }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: async () => {
        const loggedIn = await useUserStore.getState().getLoggedInUser();
        if (loggedIn) return { path: 'Balance' }
      }
    },
    {
      path: '/balance',
      name: 'Balance',
      component: Balance,
      beforeEnter: async () => {
        const loggedIn = await useUserStore.getState().getLoggedInUser();
        if (!loggedIn) return { path: 'login' }
      }
    },
    {
      path: '/edit-user',
      name: 'Update User',
      component: Update,
      beforeEnter: async () => {
        const loggedIn = await useUserStore.getState().getLoggedInUser();
        if (!loggedIn) return { path: 'login' }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
    },
  ],
})

export default router

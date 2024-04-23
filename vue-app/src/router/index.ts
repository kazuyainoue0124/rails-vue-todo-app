import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AddTodoView from '@/views/AddTodoView.vue';
import EditTodoView from '@/views/EditTodoView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/todos/new',
      name: 'new',
      component: AddTodoView
    },
    {
      path: '/todos/:id/edit',
      name: 'edit',
      component: EditTodoView
    },
  ]
});

export default router;

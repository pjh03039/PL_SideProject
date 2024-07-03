import { createRouter, createWebHashHistory } from 'vue-router';
import AppComponent from '@/App.vue';

const routes = [
  {
    path: '/',
    component: AppComponent,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

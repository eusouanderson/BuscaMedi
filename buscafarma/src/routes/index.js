import { createRouter, createWebHistory } from 'vue-router';
import HomePageView from '@/views/HomePageView.vue';
import WhoWeAreView from '@/views/WhoWeAreView.vue';
import HealthView from '@/views/HealthView.vue';

const routes = [
  { path: '/', component: HomePageView },
  { path: '/whoweare', component: WhoWeAreView },
  { path: '/health', component: HealthView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

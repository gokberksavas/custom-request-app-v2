import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import SubmissionPage from '@/pages/SubmissionPage.vue';

const routes: any = [
  {
    path: '/',
    name: 'homepage',
  },
  {
    path: '/portfolio',
    name: 'portfolio-page',
  },
  {
    path: '/submit-request',
    name: 'submission-page',
    component: SubmissionPage,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

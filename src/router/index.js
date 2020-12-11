import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "" */ '@/views/Home')
  },
  {
    path: '/translators',
    name: 'Registered Translator',
    component: () => import(/* webpackChunkName: "translators" */ '@/views/Translators')
  },
  {
    path: '/applications',
    name: 'Verified Translator Applications',
    component: () => import(/* webpackChunkName: "applications" */ '@/views/Applications')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;

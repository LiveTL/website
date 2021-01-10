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
  },
  {
    path: '/sign-in-error',
    name: 'Sign In Error',
    component: () => import(/* webpackChunkName: "sign-in-error" */ '@/views/SignInError')
  },
  {
    path: '/ios-note',
    name: 'iOS',
    component: () => import(/* webpackChunkName: "ios-note" */ '@/views/IOS')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '@/views/Contact')
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import(/* webpackChunkName: "faq" */ '@/views/FAQ')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;

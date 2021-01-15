import Vue from 'vue';
import VueRouter from 'vue-router';
import { availableLanguages, loadLanguageAsync } from '../plugins/i18n';
import Container from '@/Container';

Vue.use(VueRouter);

const routes = [
  {
    path: '/:lang',
    name: 'container',
    component: Container,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home')
      },
      {
        path: 'translators',
        name: 'Registered Translator',
        component: () => import(/* webpackChunkName: "translators" */ '@/views/Translators')
      },
      {
        path: 'applications',
        name: 'Verified Translator Applications',
        component: () => import(/* webpackChunkName: "applications" */ '@/views/Applications')
      },
      {
        path: 'sign-in-error',
        name: 'Sign In Error',
        component: () => import(/* webpackChunkName: "sign-in-error" */ '@/views/SignInError')
      },
      {
        path: 'ios-note',
        name: 'iOS',
        component: () => import(/* webpackChunkName: "ios-note" */ '@/views/IOS')
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import(/* webpackChunkName: "contact" */ '@/views/Contact')
      },
      {
        path: 'faq',
        name: 'FAQ',
        component: () => import(/* webpackChunkName: "faq" */ '@/views/FAQ')
      }
    ]
  },
  {
    path: '*',
    redirect: 'en'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log(to.params);
  if (availableLanguages.find(loc => loc.code === to.params.lang) === undefined) {
    return next('en');
  }

  loadLanguageAsync(to.params.lang);
  next();
});

export default router;

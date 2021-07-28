import Vue from 'vue';
import VueRouter from 'vue-router';
import { availableLanguages, i18n, loadLanguageAsync } from '../plugins/i18n';
import Container from '@/Container';
import posts from '../js/posts.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/:lang',
    name: 'container',
    component: Container,
    children: [
      {
        path: '',
        alias: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home')
      }, {
        path: 'translators',
        name: 'Registered Translator',
        component: () => import(/* webpackChunkName: "translators" */ '@/views/Translators')
      }, {
        path: 'hyperchat',
        name: 'HyperChat by LiveTL',
        component: () => import(/* webpackChunkName: "hyperchat" */ '@/views/Hyperchat')
      }, {
        path: 'news',
        name: 'LiveTL News',
        component: () => import(/* webpackChunkName: "news" */ '@/views/News'),
        children: [{
          path: 'latest',
          name: 'Latest Announcement',
          beforeEnter(to, from, next) {
            if (posts.length && posts[posts.length - 1].link) {
              window.location.replace(posts[posts.length - 1].link);
            } else {
              next('news');
            }
          }
        }]
      }, {
        path: 'applications',
        name: 'Verified Translator Applications',
        component: () => import(/* webpackChunkName: "applications" */ '@/views/Applications')
      }, {
        path: 'sign-in-error',
        name: 'Sign In Error',
        component: () => import(/* webpackChunkName: "sign-in-error" */ '@/views/SignInError')
      }, {
        path: 'ios-note',
        name: 'iOS',
        component: () => import(/* webpackChunkName: "ios-note" */ '@/views/IOS')
      }, {
        path: 'contact',
        name: 'Contact',
        component: () => import(/* webpackChunkName: "contact" */ '@/views/Contact')
      }, {
        path: 'faq',
        name: 'FAQ',
        component: () => import(/* webpackChunkName: "faq" */ '@/views/FAQ')
      }, {
        path: 'docs/api',
        name: 'API Documentation',
        beforeEnter(_, __, ___) {
          window.location.replace('https://docs.livetl.app/api');
        }
      }, {
        path: 'privacy',
        name: 'Privacy Policy',
        component: () => import(/* webpackChunkName: "faq" */ '@/views/Privacy'),
        children: [
          {
            path: ':platform',
            name: 'Platform Specific Privacy Policy',
            component: () => import(/* webpackChunkName: "faq" */ '@/views/Privacy')
          }
        ]
      }, {
        path: 'discord',
        name: 'Discord Server',
        beforeEnter(_, __, ___) {
          window.location.replace('https://discord.gg/uJrV3tmthg');
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const pathSegments = to.path.split('/').splice(1); // skip first because it's empty
  // Get the first part of the path (should be the lang)
  const first = pathSegments[0];
  const lang = i18n.locale;

  // If there isn't a path, redirect to the home page (in the selected language)
  if (first === '') {
    return next(`/${lang}/home/`);
  }

  if (availableLanguages.find(loc => loc.code === first) === undefined) {
    // the first segment isn't a lang, so we have to redirect to the set language route. However we want to redirect to
    // the same page the user was trying to load, which is what the first segment is (probably) when it's not a lang
    return next(`/${lang}/${first}/`);
  }

  loadLanguageAsync(first);
  next();
});

export default router;

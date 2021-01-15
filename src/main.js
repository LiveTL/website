import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { auth } from './firebase';
import { i18n } from './plugins/i18n';

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged(user => {
  if (app !== null) {
    store.commit('setCurrentUser', user);

    app = new Vue({
      router,
      store,
      vuetify,
      i18n,
      render: h => h(App)
    }).$mount('#app');
  }
});

const utils = {
  install(Vue, options) {
    Vue.prototype.getLangLink = (link) => {
      if (link === '/') {
        return `/${i18n.locale}/`;
      } else {
        return `/${i18n.locale}/${link}`;
      }
    };
  }
};

Vue.use(utils);

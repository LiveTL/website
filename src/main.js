import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { i18n } from './plugins/i18n';
import { Auth0Plugin } from './plugins/auth0';
import { audience, clientId, domain } from '../auth0-config.json';

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: async(appState) => {
    await router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app');

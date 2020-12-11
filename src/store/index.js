import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    translators: []
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    addTranslator(state, val) {
      // check to see if the translator already exists in the store
      let match = false;
      for (const translator of state.translators) {
        if (translator.id === val.id) {
          match = true;
        }
      }

      if (match === false) {
        state.translators.push(val);
      }
    },
    removeTranslator(state, val) {
      const index = state.translators.findIndex(translator => translator.id === val);
      state.translators = state.translators.splice(index, index + 1);
    },
    updateTranslator(state, val) {
      const index = state.translators.findIndex(translator => translator.id === val.id);
      state.translators[index] = val;
    }
  },
  actions: {},
  modules: {},
  getters: {
    getUser(state) {
      return state.currentUser;
    },
    getTranslators(state) {
      return state.translators;
    }
  }
});

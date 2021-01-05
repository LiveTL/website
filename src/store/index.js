import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    users: []
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    addUser(state, val) {
      // check to see if the translator already exists in the store
      let match = false;
      for (const translator of state.users) {
        if (translator.id === val.id) {
          match = true;
        }
      }

      if (match === false) {
        state.users.push(val);
      }
    },
    removeUser(state, val) {
      const index = state.users.findIndex(translator => translator.id === val);
      state.users = state.users.splice(index, index + 1);
    },
    updateUser(state, val) {
      const index = state.users.findIndex(translator => translator.id === val.id);
      state.users[index] = val;
    }
  },
  actions: {},
  modules: {},
  getters: {
    getUser(state) {
      return state.currentUser;
    },
    getUsers(state) {
      return state.users;
    }
  }
});

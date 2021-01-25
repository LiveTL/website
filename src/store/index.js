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
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].id === val.id) {
          // update user instead of adding
          state.users[i] = val;
          return;
        }
      }

      // add user
      state.users.push(val);
    },
    removeUser(state, val) {
      const index = state.users.findIndex(translator => translator.id === val);
      state.users = state.users.splice(index, 1);
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

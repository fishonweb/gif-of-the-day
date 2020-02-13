import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    status: null,
    error: null,
    assignedTeamId: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    removeUser(state) {
      state.user = null;
    },

    setStatus(state, payload) {
      state.status = payload;
    },

    setError(state, payload) {
      state.error = payload;
    },

    setAssignedTeamId(state, payload) {
      state.assignedTeamId = payload;
    }
  },
  actions: {
    assignTeamAction({ commit }, teamId) {
      commit('setAssignedTeamId', teamId);
    },

    autoLoginAction({commit}, user) {
      commit('setUser', user);
      commit('setStatus', 'success');
    },

    updateUserAction({ commit }, user) {
      commit('setStatus', 'loading');

      firebase
        .auth()
        .currentUser
        .updateProfile(user)
        .then(() => {
          commit('setUser', user);
          commit('setStatus', 'success');
          commit('setError', null);
          commit('setAssignedTeamId', user.assignedTeamId);
        })
        .catch(error => {
          commit('setStatus', 'failure');
          commit('setError', error.message);
        });
    },

    signInWithGoogleAction({ commit }) {
      commit('setStatus', 'loading');
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(response => {
          commit('setUser', response.user);
          commit('setStatus', 'success');
          commit('setError', null);
          commit('setAssignedTeamId', response.user.assignedTeamId);
        })
        .catch(error => {
          commit('setStatus', 'failure');
          commit('setError', error.message);
        });
    },

    signOutAction({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null);
          commit('setStatus', 'success');
          commit('setError', null);
          commit('setAssignedTeamId', null);
        })
        .catch(error => {
          commit('setStatus', 'failure');
          commit('setError', error.message);
        });
    }
  },

  getters: {
    status(state) {
      return state.status;
    },

    user(state) {
      return state.user;
    },

    error(state) {
      return state.error;
    },

    assignedTeamId(state) {
      return state.assignedTeamId;
    }
  }
});
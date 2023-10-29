import createPersistedState from 'vuex-persistedstate';
import { createStore } from 'vuex';

const store = createStore({
    state: {
      isLoggedIn: false,
      csrfToken: null,
      username: null
    },
    mutations: {
      setLoginStatus(state, answer) {
        state.isLoggedIn = answer;
      },
      login(state) {
        state.isLoggedIn = true;
      },
      logout(state) {
        state.isLoggedIn = false;
      },
      setCSRFToken(state, token) {
        state.csrfToken = token;
      },
      setUsername(state, username) {
        state.username = username;
      }
    },
    getters: {
      isLoggedIn: state => state.isLoggedIn, // Define a getter that returns the isLoggedIn variable
      csrfToken: state => state.csrfToken,
    },
    plugins: [createPersistedState()],
  });
export default store;
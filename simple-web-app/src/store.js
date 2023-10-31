import createPersistedState from 'vuex-persistedstate';
import { createStore } from 'vuex';

const store = createStore({
    state: {
      isLoggedIn: false,
      csrfToken: null,
      username: null,
      userID: null,
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
      },
      setUserID(state, userID) {
        state.userID = userID;
      }
    },
    getters: {
      isLoggedIn: state => state.isLoggedIn, // Define a getter that returns the isLoggedIn variable
      csrfToken: state => state.csrfToken,
      userID: state => state.userID,
    },
    plugins: [createPersistedState()],
  });
export default store;
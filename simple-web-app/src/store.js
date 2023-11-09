import createPersistedState from 'vuex-persistedstate';
import { createStore } from 'vuex';

const store = createStore({
    state: {
      isLoggedIn: false,
      csrfToken: null,
      username: null,
      userID: null,
      isStaff: null,
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
      },
      setIsStaff(state, isStaff) {
        state.isStaff = isStaff;
      }
    },
    getters: {
      isLoggedIn: state => state.isLoggedIn, // Define a getter that returns the isLoggedIn variable
      csrfToken: state => state.csrfToken,
      userID: state => state.userID,
      isStaff: state => state.isStaff,
    },
    plugins: [createPersistedState()],
  });
export default store;
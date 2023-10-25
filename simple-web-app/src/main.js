import Vue from 'vue';
import { createApp } from 'vue'
import App from './App.vue'
import "../src/assets/styles.css";
import "../src/assets/index.js"
import router from './router';
import { createStore } from 'vuex';

const store = createStore({
  state: {
    isLoggedIn: false,
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
  },
  actions: {
    getAnswer(context) {
      context.commit('setLoginStatus', answer);
    },
  },
});

// Create your Vue app instance
const app = createApp(App);
app.config.globalProperties.isLoggedIn = store.state.isLoggedIn;
app.config.globalProperties.login = () => store.commit('login');
app.config.globalProperties.logout = () => store.commit('logout');

// Use router and store (if needed)
app.use(router, store);

// Mount your app to the DOM
app.mount('#app');



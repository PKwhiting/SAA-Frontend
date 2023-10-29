import { createApp } from 'vue'
import App from './App.vue'
import "../src/assets/styles.css";
import "../src/assets/index.js"
import router from './router';

import axios from 'axios'
import createPersistedState from 'vuex-persistedstate';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"
import Vue from 'vue'
import store from './store'


// Create your Vue app instance
const app = createApp(App);
app.config.globalProperties.isLoggedIn = store.state.isLoggedIn;
app.config.globalProperties.login = () => store.commit('login');
app.config.globalProperties.logout = () => store.commit('logout');

// Use router and store (if needed)
app.use(router, store);

// Mount your app to the DOM
app.mount('#app');




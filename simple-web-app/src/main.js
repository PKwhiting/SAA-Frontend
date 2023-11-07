import { createApp } from 'vue'
import App from './App.vue'
import "../src/assets/styles.css";
import "../src/assets/index.js"
import router from './router';
import * as Sentry from "@sentry/vue";

import axios from 'axios'
import createPersistedState from 'vuex-persistedstate';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"
import store from './store'


// Create your Vue app instance
const app = createApp(App);
app.config.globalProperties.isLoggedIn = store.state.isLoggedIn;
app.config.globalProperties.login = () => store.commit('login');
app.config.globalProperties.logout = () => store.commit('logout');

Sentry.init({
    app,
    dsn: "https://b27f17c3829f259edea1268a8bc9a029@o4506183471923200.ingest.sentry.io/4506183473823744",
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
      new Sentry.Replay(),
    ],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  
    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  
    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });


app.use(router, store);
app.mount('#app');




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
            // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
            tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        }),
        new Sentry.Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});


app.use(router, store);
app.mount('#app');




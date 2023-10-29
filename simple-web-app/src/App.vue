<template>
  <body>
    <div class="page-wrapper">
      <Navbar></Navbar>
      <div class="main-section wf-section">
        <div class="container-default w-container">
          <div class="grid-2-columns main-dashboard-grid">
            <div style="width: 200px">
              <toolbar></toolbar>
            </div>

            <div
              id="w-node-_5b7b5ab1-6d00-c7e0-62e6-f29490555c22-e9803f0d"
              class="dashboard-main-content"
            >
              <router-view />
            </div>
          </div>
        </div>
      </div>
      <notification-bar v-if="this.isNotificationBarVisible" :message="this.notificationMessage" :color="this.notificationColor" :duration="this.notificationDuration" :icon="this.notificationIcon" />
      <Footer></Footer>
    </div>
    <login-modal v-show="this.isLoginModalVisible"/>
  </body>
</template>

<script>
import SingleCarView from "./views/SingleCarView.vue";
import Navbar from "./components/Navbar.vue";
import Toolbar from "./components/Toolbar.vue";
import Footer from "./components/Footer.vue";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
import LoginModal from "./components/LoginModal.vue"
import NotificationBar from "./components/NotificationBar.vue";
import { mapState, mapMutations } from "vuex";
import store from "./store"
import api from '../axios';

export default {
  name: "App",
  components: {
    Navbar,
    SingleCarView,
    Toolbar,
    Footer,
    LoginModal,
    NotificationBar,
  },
  data() {
    return {
      isLoginModalVisible: false,
      isNotificationBarVisible: false,
      notificationMessage: '',
      notificationColor: 'green',
      notificationDuration: 5000,
      isLoggedIn: null,
    };
  },
  methods: {
    showNotificationBar(message, color, duration, icon) {
      this.notificationMessage = message;
      this.notificationColor = color;
      this.notificationDuration = duration;
      this.notificationIcon = icon;
      this.isNotificationBarVisible = true;
      
    },
    flipLoginModalVisibility() {
      this.isLoginModalVisible = !this.isLoginModalVisible;
    },
    logout() {
      if (store.getters.isLoggedIn){
        store.commit("logout")
        const icon = require('@/assets/paper-clip-svg.svg');
        this.$root.showNotificationBar('Logged Out Successfully', 'red', 1500, icon)
      }
      ;
    },
  },
  setup() {},
  mounted() {
    api
      .get("get_csrf_token/")
      .then((response) => {
        store.commit("setCSRFToken", response.data.csrfToken);
      })
      .catch((error) => {
        console.error("Error fetching CSRF token:", error);
      });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

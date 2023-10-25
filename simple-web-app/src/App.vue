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
      <Footer></Footer>
    </div>
    <login-modal v-show="isLoginModalVisible"/>
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

export default {
  name: "App",
  components: {
    Navbar,
    SingleCarView,
    Toolbar,
    Footer,
    LoginModal,
  },
  data() {
    return {
      isLoginModalVisible: false,
    };
  },
  methods: {
    flipLoginModalVisibility() {
      console.log("HERE")
      this.isLoginModalVisible = !this.isLoginModalVisible;
    },
  },
  setup() {},
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

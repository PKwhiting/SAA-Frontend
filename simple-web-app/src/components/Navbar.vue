<template>
  <div>
    <div
      data-w-id="da732deb-5db6-156b-08c9-e9fd059bc49f"
      data-animation="default"
      data-collapse="medium"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      role="banner"
      class="header-wrapper w-nav"
    >
      <div class="container-default w-container">
        <div class="header-content-wrapper">
          <a
            href="/"
            aria-current="page"
            class="logo-link-wrapper w-nav-brand w--current"
            ><img
              src="../assets/SC-LOGO.png"
              loading="eager"
              alt="Dashflow X Webflow Template - Logo"
              style="max-width: 200px"
          /></a>
          <nav role="navigation" class="header-nav-menu-wrapper w-nav-menu">
            <div class="header-sidebar-wrapper">
              <div
                id="w-node-_33df89bc-f82c-cc1e-d5c4-4959632564a9-632564a9"
                class="sidebar-container"
              >
                <!-- <div class="text-50 medium sidebar-title">Start here</div> -->
                <div class="grid-1-column sidebar-links-grid mg-bottom-48px">
                  <a
                    href="/"
                    aria-current="page"
                    class="sidebar-link w-inline-block w--current"
                    ><img
                      src="https://assets-global.website-files.com/653028834fc27f7bf2eff1c3/653028834fc27f7bf2eff2fa_home-sidebar-link-icon-dashflow-webflow-template.png"
                      loading="eager"
                      alt="Home - Dashflow X Webflow Template"
                      class="max-w-20px"
                    />
                    <div class="text-100 medium">Home</div>
                  </a>
                  <a href="/account" class="sidebar-link w-inline-block">
                    <div class="avatar-name-circle _24px" v-show="isLoggedIn">
                      {{ username ? username[0].toUpperCase() : ''   }}
                    </div>
                    <div class="text-100 medium" v-show="isLoggedIn">
                      Account
                    </div></a
                  >
                  <a href="/" class="sidebar-link w-inline-block"
                    ><img
                      src="@/assets/gavel.svg"
                      loading="eager"
                      alt="Changelog - Dashflow X Webflow Template"
                      class="max-w-20px"
                    />
                    <div class="text-100 medium">Auction Inventory</div>
                  </a>
                  <a href="/sold" class="sidebar-link w-inline-block"
                    ><img
                      src="https://assets-global.website-files.com/653028834fc27f7bf2eff1c3/653028834fc27f7bf2eff2f7_changelog-sidebar-link-icon-dashflow-webflow-template.png"
                      loading="eager"
                      alt="Changelog - Dashflow X Webflow Template"
                      class="max-w-20px"
                    />
                    <div class="text-100 medium">Sold Vehicles</div>
                  </a>
                  <a
                    v-if="isLoggedIn && isStaff"
                    href="/add-vehicle"
                    class="sidebar-link w-inline-block"
                    ><img
                      src="@/assets/plus.svg"
                      loading="eager"
                      alt="Changelog - Dashflow X Webflow Template"
                      class="max-w-20px"
                    />
                    <div class="text-100 medium">List Vehicle</div>
                  </a>
                  <a
                    v-if="isLoggedIn"
                    href="/saved-vehicles"
                    class="sidebar-link w-inline-block"
                    ><img
                      src="@/assets/heart-svg.svg"
                      loading="eager"
                      alt="Changelog - Dashflow X Webflow Template"
                      class="max-w-20px"
                    />
                    <div class="text-100 medium">Saved Vehicles</div>
                  </a>
                  <a
                    v-if="isLoggedIn"
                    @click="logout()"
                    class="sidebar-link w-inline-block"
                    ><img
                      src="@/assets/logout.svg"
                      loading="eager"
                      alt="Licenses - Dashflow X Webflow Template"
                      class="max-w-20px"
                    />
                    <div class="text-100 medium">Sign Out</div>
                  </a>
                </div>
              </div>
            </div>
            <div class="hidden-on-desktop show-on-tablet">
              <div class="buttons-row gap-column-12px">
                <a
                  data-w-id="dc3b625c-4a68-4ebe-9b74-d3193fa9f32f"
                  href="/about-us"
                  class="btn-secondary w-inline-block"
                >
                  <div class="flex-horizontal gap-column-4px">
                    <div>About Us</div>
                  </div>
                </a>
                <a
                  data-w-id="5228fae3-1046-92bf-afc3-a85185c5a451"
                  href="#"
                  class="btn-secondary w-inline-block"
                  @click="login()"
                  v-if="!isLoggedIn"
                >
                  <div class="flex-horizontal gap-column-4px">
                    <div>Login</div>
                  </div>
                </a>
              </div>
            </div>
          </nav>
          <div class="header-right-side-container">
            <div class="hidden-on-mbl">
              <div class="buttons-row gap-column-12px">
                <a
                  data-w-id="5228fae3-1046-92bf-afc3-a85185c5a451"
                  href="/about-us"
                  class="btn-secondary w-inline-block"
                >
                  <div class="flex-horizontal gap-column-4px">
                    <div>About Us</div>
                  </div>
                </a>
                <a
                  data-w-id="dc3b625c-4a68-4ebe-9b74-d3193fa9f32f"
                  href="#"
                  class="btn-primary w-inline-block"
                  @click="login()"
                  v-if="!isLoggedIn"
                >
                  <div class="flex-horizontal gap-column-4px">
                    <div>Login</div>
                  </div>
                </a>
              </div>
            </div>
            <div class="hamburger-menu-wrapper w-nav-button">
              <div class="hamburger-menu-bar top"></div>
              <div class="hamburger-menu-bar bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import store from "../store";

export default {
  nsame: "Navbar",
  computed: {
    isLoggedIn() {
      return store.state.isLoggedIn;
    },
    isStaff() {
      return store.state.isStaff;
    },
    username() {
      return store.state.username
    },
  },
  methods: {
    logout() {
      this.$root.logout();
      this.$forceUpdate();
      this.$router.push("/");
    },
    login() {
      this.$root.flipLoginModalVisibility();
    },
  },
};
</script>

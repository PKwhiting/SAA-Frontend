<template>
  <div
    id="w-node-_9dd682ff-5944-0545-c8a7-6848bb794a95-e9803f0d"
    class="sticky-top hidden-on-tablet"
  >
    <div
      id="w-node-_33df89bc-f82c-cc1e-d5c4-4959632564a9-632564a9"
      class="sidebar-container"
    >
      <div class="grid-1-column sidebar-links-grid mg-bottom-48px" style="margin-top: 75px">
        <a href="/user" class="sidebar-link w-inline-block"
          >
          <div class="avatar-name-circle _48px" v-show="isLoggedIn">JC</div>
          <div class="text-100 medium" v-show="isLoggedIn">Test User</div></a
        >
        <a href="/" class="sidebar-link w-inline-block"
          ><img
            src="../assets/car-svg.svg"
            loading="eager"
            alt="Home - Dashflow X Webflow Template"
            class="max-w-20px"
          />
          <div class="text-100 medium">All Vehicles</div></a
        ><a @click="logout()" class="sidebar-link w-inline-block"
          ><img
            src="../assets/logout.svg"
            loading="eager"
            alt="Home - Dashflow X Webflow Template"
            class="max-w-20px"
          />
          <div class="text-100 medium">Sign Out</div></a
        >
        <!-- <a href="/changelog" class="sidebar-link w-inline-block" v-show="isLoggedIn"
          ><img
            src="../assets/heart-svg.svg"
            loading="eager"
            alt="Changelog - Dashflow X Webflow Template"
            class="max-w-20px"
          />
          <div class="text-100 medium">Saved Vehicles</div></a
        ><a href="/licenses" class="sidebar-link w-inline-block" v-show="isLoggedIn"
          ><img
            src="../assets/paper-clip-svg.svg"
            loading="eager"
            alt="Licenses - Dashflow X Webflow Template"
            class="max-w-20px"
          />
          <div class="text-100 medium">Paperwork</div></a
        > -->
      </div>
      <!-- <div class="text-50 medium sidebar-title">Components</div>
      <div class="grid-1-column sidebar-links-grid">
        <a href="#buttons" class="sidebar-link w-inline-block w--current"
          ><img
            src="https://assets.website-files.com/645128e3dbdad55ed2803eff/645990a02407a4524fa979ba_buttons-sidebar-link-icon-dashflow-webflow-template.png"
            loading="eager"
            alt="Buttons - Dashflow X Webflow Template"
            class="max-w-20px"
          />
          <div class="text-100 medium">Buttons</div></a
        ><a href="#inputs" class="sidebar-link w-inline-block"
          ><img
            src="https://assets.website-files.com/645128e3dbdad55ed2803eff/645990a169c84c5ebfc63290_inputs-sidebar-link-icon-dashflow-webflow-template.png"
            loading="eager"
            alt="Inputs - Dashflow X Webflow Template"
            class="max-w-20px"
          />
          <div class="text-100 medium">Inputs</div></a
        ><a href="#avatars" class="sidebar-link w-inline-block"
          ><img
            src="https://assets.website-files.com/645128e3dbdad55ed2803eff/645990a1b266ba59d5c10399_avatars-sidebar-link-icon-dashflow-webflow-template.png"
            loading="eager"
            alt="Avatars - Dashflow X Webflow Template"
            class="max-w-20px"
          />
          <div class="text-100 medium">Avatars</div></a
        ><a href="#badges" class="sidebar-link w-inline-block"
          ><img
            src="https://assets.website-files.com/645128e3dbdad55ed2803eff/645990a1d74a10eeb52301da_badges-sidebar-link-icon-dashflow-webflow-template.png"
            loading="eager"
            alt="Badges - Dashflow X Webflow Template"
            class="max-w-20px"
          />
          <div class="text-100 medium">Badges</div></a
        ><a href="#tooltips" class="sidebar-link w-inline-block"
          ><img
            src="https://assets.website-files.com/645128e3dbdad55ed2803eff/645990a047224a5fb2cfcf89_tooltips-sidebar-link-icon-dashflow-webflow-template.png"
            loading="eager"
            alt="Tooltips - Dashflow X Webflow Template"
            class="max-w-20px"
          />
          <div class="text-100 medium">Tooltips</div></a
        ><a href="#notifications" class="sidebar-link w-inline-block"
          ><img
            src="https://assets.website-files.com/645128e3dbdad55ed2803eff/645990a0a9c4112cb7a8b987_notifications-sidebar-link-icon-dashflow-webflow-template.png"
            loading="eager"
            alt="Notifications - Dashflow X Webflow Template"
            class="max-w-20px"
          />
          <div class="text-100 medium">Notifications</div></a
        ><a href="#cards" class="sidebar-link w-inline-block"
          ><img
            src="https://assets.website-files.com/645128e3dbdad55ed2803eff/645990a047224a2d72cfcf88_cards-sidebar-link-icon-dashflow-webflow-template.png"
            loading="eager"
            alt="Cards - Dashflow X Webflow Template"
            class="max-w-20px"
          />
          <div class="text-100 medium">Cards</div></a
        ><a href="#tables" class="sidebar-link w-inline-block"
          ><img
            src="https://assets.website-files.com/645128e3dbdad55ed2803eff/645990a11b8dbbce9b14ab98_tables-sidebar-link-icon-dashflow-webflow-template.png"
            loading="eager"
            alt="Tables - Dashflow X Webflow Template"
            class="max-w-20px"
          />
          <div class="text-100 medium">Tables</div></a
        ><a href="#modals" class="sidebar-link w-inline-block"
          ><img
            src="https://assets.website-files.com/645128e3dbdad55ed2803eff/645990a0aebb03227e28966a_modals-sidebar-link-icon-dashflow-webflow-template.png"
            loading="eager"
            alt="Modals - Dashflow X Webflow Template"
            class="max-w-20px"
          />
          <div class="text-100 medium">Modals</div></a
        ><a href="#tabs" class="sidebar-link w-inline-block"
          ><img
            src="https://assets.website-files.com/645128e3dbdad55ed2803eff/645990a069c84cdda7c6328e_tabs-sidebar-link-icon-dashflow-webflow-template.png"
            loading="eager"
            alt="Tabs - Dashflow X Webflow Template"
            class="max-w-20px"
          />
          <div class="text-100 medium">Tabs</div></a
        ><a href="#breadcrumbs" class="sidebar-link w-inline-block"
          ><img
            src="https://assets.website-files.com/645128e3dbdad55ed2803eff/645990a0fc639032a43f0db9_breadcrumbs-sidebar-link-icon-dashflow-webflow-template.png"
            loading="eager"
            alt="Breadcrumbs - Dashflow X Webflow Template"
            class="max-w-20px"
          />
          <div class="text-100 medium">Bread crumbs</div></a
        ><a href="#empty-states" class="sidebar-link w-inline-block"
          ><img
            src="https://assets.website-files.com/645128e3dbdad55ed2803eff/645990a0d74a1012da23019c_empty-states-sidebar-link-icon-dashflow-webflow-template.png"
            loading="eager"
            alt="Empty States - Dashflow X Webflow Template"
            class="max-w-20px"
          />
          <div class="text-100 medium">Empty states</div></a
        >
      </div> -->
    </div>
  </div>
</template>

<script>
export default({
  methods: {
    logout() {
      this.$root.logout()
    }
  },
})
</script>

<template>
  <div>
    <img
      @click="unsaveCar"
      :src="require('@/assets/heart-filled.svg')"
      alt="Saved"
      class="heart-icon"
      :class="{ 'heart-icon-expanded': isHovered }"
      :style="{ display: isCarSaved() ? 'block' : 'none' }"
      @mouseover="isHovered = true"
      @mouseout="isHovered = false"
    />
    <img
      @click="saveCar"
      :src="require('@/assets/heart.svg')"
      alt="Unsaved"
      class="heart-icon"
      :class="{ 'heart-icon-expanded': isHovered }"
      :style="{ display: isCarSaved() ? 'none' : 'block' }"
      @mouseover="isHovered = true"
      @mouseout="isHovered = false"
    />
  </div>
</template>

<script>
import api from "../../axios";
import store from "../store";

export default {
  props: {
    carId: {
      type: [String, Number],
      required: true,
    },
    isSavedInitially: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isSaved: this.isSavedInitially,
      isHovered: false,
    };
  },

  methods: {
    isCarSaved() {
      return this.isSaved;
    },
    saveCar() {
      if (!store.getters.isLoggedIn) {
        const icon = require("@/assets/cross.svg");
        this.$root.showNotificationBar(
          "Please log in to save vehicles",
          "red",
          3000,
          icon
        );
        return;
      }
      api
        .post(
          `add-saved-vehicle/${store.state.userID}`,
          {
            carID: this.carId,
          },
          {
            headers: {
              "X-CSRFToken": store.getters.csrfToken,
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          const icon = require("@/assets/heart-svg.svg");
          this.isSaved = true;
          this.$root.showNotificationBar(
            "Vehicle Saved Successfully",
            "green",
            1500,
            icon
          );
        })
        .catch((error) => {
          const icon = require("@/assets/cross.svg");
          this.$root.showNotificationBar(
            "Issue adding vehicle to saved vehicles. Contact Admin for help.",
            "red",
            3000,
            icon
          );
        });
    },
    unsaveCar() {
      if (!store.getters.isLoggedIn) {
        const icon = require("@/assets/cross.svg");
        this.$root.showNotificationBar(
          "Please log in to save vehicles",
          "red",
          3000,
          icon
        );
        return;
      }
      api
        .post(
          `remove-saved-vehicle/${store.state.userID}`,
          {
            carID: this.carId,
          },
          {
            headers: {
              "X-CSRFToken": store.getters.csrfToken,
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          const icon = require("@/assets/heart-svg.svg");
          this.isSaved = false;
          this.$root.showNotificationBar(
            "Vehicle Unsaved Successfully",
            "green",
            2000,
            icon
          );
        })
        .catch((error) => {
          const icon = require("@/assets/cross.svg");
          this.$root.showNotificationBar(
            "Issue removing saved vehicle to saved vehicles. Contact Admin for help.",
            "red",
            3000,
            icon
          );
        });
    },
  },
};
</script>

<style scoped>
.heart-icon {
    width: 20px;
    height: 20px;
  max-width: 20px;
  transition: transform 0.3s;
}

.heart-icon-expanded {
  transform: scale(1.2);
}
</style>
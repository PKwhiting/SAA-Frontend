<template>
  <div class="notification-bar" :class="color">
    <div class="notification-bar-main-container">
      <div class="flex align-start gap-column-6px">
        <img :src="icon" loading="eager" alt="" class="notification-bar-icon" :class="color">
        <div class="text-100 medium color-neutral-800">{{ message }}</div>
      </div>
      <div @click="close" class="close-icon-wrapper">
        <div class="close-icon-line first"></div>
        <div class="close-icon-line second"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'green',
      validator: (value) => ['green', 'red', 'blue'].includes(value),
    },
    duration: {
      type: Number,
      default: 5000,
    },
    icon: {
      type: String,
      default: 'https://assets.website-files.com/645128e3dbdad55ed2803eff/6452a204334d6c315be34a57_success-message-notification-bar-dashflow-webflow-template.svg',
    },
  },
  data() {
    return {
      isVisible: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.$root.isNotificationBarVisible = false;
    }, this.duration);
  },
  methods: {
    close() {
      this.$root.isNotificationBarVisible = false;
    },
  },
};
</script>

<style scoped>
.notification-bar {
  position: fixed;
  bottom: 150px;
  left: 30px;
  right: 30px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  transition: transform 0.3s ease-out;
  transform: translateY(100%);
}

.notification-bar.green {
  background-color: #e6f4ea;
}

.notification-bar.red {
  background-color: #ffe6e6;
}

.notification-bar.blue {
  background-color: #e6f4ff;
}

.notification-bar.visible {
  transform: translateY(0);
}

.notification-bar-main-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-bar-icon {
  width: 24px;
  height: 24px;
}

.notification-bar-icon.green {
  filter: invert(47%) sepia(100%) saturate(746%) hue-rotate(96deg) brightness(108%) contrast(101%);
}

.notification-bar-icon.red {
  filter: invert(47%) sepia(100%) saturate(746%) hue-rotate(0deg) brightness(108%) contrast(101%);
}

.notification-bar-icon.blue {
  filter: invert(47%) sepia(100%) saturate(746%) hue-rotate(204deg) brightness(108%) contrast(101%);
}

.close-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.close-icon-line {
  width: 16px;
  height: 2px;
  background-color: #000;
  transition: transform 0.3s ease-out;
}

.close-icon-line.first {
  transform: translate3d(0, 0, 0) rotate(45deg);
}

.close-icon-line.second {
  transform: translate3d(0, 0, 0) rotate(-45deg);
}
</style>
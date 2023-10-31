<template>
  <div class="card pd-24px---18px---28px" style="margin-top: 24px">
    <div class="mg-bottom-8px">
      <div class="text-300 bold color-neutral-800" style="text-align: center">
        CURRENT BID: ${{ currentBid }} USD
      </div>
    </div>
    <div
      class="grid-3-columns mg-bottom-4px"
      style="display: flex; margin-top: 24px; justify-content: center"
    >
      <a
        href="#"
        class="btn-primary w-inline-block"
        @click="decrementBid"
        style="background: #ff5733; border-color: #ff5733"
        ><div class="flex-horizontal gap-column-4px">-</div></a
      >
      <div style="max-width: 70%">
        <input
          type="number"
          class="input w-input"
          maxlength="50"
          name="Name"
          data-name="Name"
          v-model="userBid"
          @input="updateCurrentBid"
        />
      </div>
      <a
        href="#"
        class="btn-primary w-inline-block"
        @click="incrementBid"
        style="background: #25872a; border-color: #9eef79"
        ><div class="flex-horizontal gap-column-4px">+</div></a
      >
    </div>
    <div
      class="text-300 bold color-neutral-800"
      style="text-align: center; color: red; margin-top: 12px"
    >
      AUCTION IN: {{  timeRemaining }}
    </div>
    <a
      href="#"
      class="btn-primary w-inline-block"
      style="margin-top: 12px; width: 100%"
      ><div class="flex-horizontal gap-column-4px" @click="submitBid()">
        PLACE BID
      </div></a
    >
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import api from '../../axios.js';
import store from "../store";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default {
  props: {
    currentBid: {
      type: String,
      required: true,
    },
    vehicleVIN: {
      type: String,
      required: true,
    },
    saleDate: {
      type: Date,
      required: true,
    }
  },
  data() {
    return { // Initial current bid value
      userBid: 1500, // Initial user's bid value
          };
  },
  computed: {
    timeRemaining() {
      const total = Date.parse(this.saleDate) - Date.parse(new Date());
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const seconds = Math.floor((total / 1000) % 60);
      return `${days}D   ${hours}H   ${minutes}M`;
    }
  },
  mounted() {
    const currentBidNumber = Number(this.currentBid);
    this.userBid = currentBidNumber.toFixed(0);
  },
  methods: {
    async submitBid() {
      if (store.state.isLoggedIn){
        const icon = require('@/assets/paper-clip-svg.svg');
          try {
            if (this.userBid <= this.currentBid) {
              this.$root.showNotificationBar('Bid Not Above Current Bid', 'red', 1500, icon)
              return
            }
            const response = await api.post('/update-bid/', {
              bid: this.userBid,
              vehicle_vin: this.vehicleVIN,
              userID : store.state.userID,
            },
            {
              headers: {
                "X-CSRFToken": store.getters.csrfToken,
              },
              withCredentials: true,
            }
            )
            this.$root.showNotificationBar('Bid Placed Successfuly', 'green', 1500, icon)
          } catch (error) {
            console.log(error)
            this.$root.showNotificationBar('Bid Placed Failed', 'red', 1500, icon)
          }
      } else{
        this.$root.flipLoginModalVisibility()
      }

    },
    incrementBid() {
      const bid = Number(this.userBid);
      this.userBid = bid + 50; // Increment the user's bid by 100 (adjust as needed)
    },
    decrementBid() {
      if (this.userBid > this.currentBid) {
        const bid = Number(this.userBid);
        this.userBid = bid - 50; // Decrement the user's bid by 100 (adjust as needed)
      }
    },
    updateCurrentBid() {
      // You can add logic here to update the currentBid in your backend if needed
      // For now, we'll just set it to the user's bid
      this.currentBid = this.userBid;
    },
  },
};
</script>
<style scoped>
.input {
  font-size: 25px;
}
.btn-primary {
  font-size: 20px;
}
</style>




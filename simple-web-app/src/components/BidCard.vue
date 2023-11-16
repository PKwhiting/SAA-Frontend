<template>
  <div class="card pd-24px---18px---28px" style="margin-top: 24px">
    <div class="mg-bottom-8px">
      <div class="text-300 bold color-neutral-800" style="text-align: center">
        CURRENT BID: ${{ currentVehicleBid }} USD
      </div>
    </div>
    <div
      class="grid-3-columns mg-bottom-4px"
      style="display: flex; margin-top: 24px; justify-content: center"
      v-show="this.auctionLive"
    >
      <a
        v-if="this.auctionType === 'SAA'"
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
          v-model="currentVehicleBid"
          @input="updateCurrentBid"
          readonly
          style="text-align: center"
        />
      </div>
      <a
        v-if="this.auctionType === 'SAA'"
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
      {{ formattedTimeRemaining }}
    </div>
    <a
      v-if="this.auctionType === 'SAA'"
      href="#"
      class="btn-primary w-inline-block"
      style="margin-top: 12px; width: 100%"
      ><div class="flex-horizontal gap-column-4px" @click="submitBid()">
        PLACE BID
      </div></a
    >
    <a
      v-if="this.auctionType != 'SAA'"
      data-w-id="dc3b625c-4a68-4ebe-9b74-d3193fa9f32f"
      v-bind:href="car.vehicle_auction_link"
      target="_blank"
      class="btn-primary w-inline-block"
      style="min-width: 100%"
      ><div class="flex-horizontal gap-column-4px">
        <div>Go to {{ this.auctionType }}</div>
        <img
          src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646cdd3a1fe350c45874c7ce_primary-button-icon-right-dashflow-webflow-template.svg"
          loading="eager"
          alt=""
          class="link-icon arrow-right"
          style="
            transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
              rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
            transform-style: preserve-3d;
          "
        /></div
    ></a>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import api from "../../axios.js";
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
    },
    car: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // Initial current bid value
      userBid: 0, // Initial user's bid value
      currentVehicleBid: null,
      currentSaleDate: this.saleDate,
      ws: null,
      formattedTimeRemaining: "Calculating...",
      auctionLive: true,
      auctionType: this.car.auction,
    };
  },
  mounted() {
    const currentBidNumber = Number(this.car.highest_bid);
    this.userBid = currentBidNumber.toFixed(0);
    this.currentVehicleBid = currentBidNumber.toFixed(0);
    setInterval(this.updateTimeRemaining, 1000);

    const total = Date.parse(this.currentSaleDate) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
  },
  methods: {
    async submitBid() {
      if (store.state.isLoggedIn) {
        let icon = require("@/assets/cross.svg");
        try {
          if (this.userBid <= this.currentBid) {
            this.$root.showNotificationBar(
              "Bid Not Above Current Bid",
              "red",
              1500,
              icon
            );
            return;
          }
          if (this.ws) {
            const message = {
              action: "place_bid",
              vehicle_vin: this.vehicleVIN,
              bid_amount: this.userBid,
              user_id: store.state.userID,
            };
            this.ws.send(JSON.stringify(message));
            let icon = require("@/assets/paper-clip-svg.svg");
            this.$root.showNotificationBar(
              "Bid Placed Successfuly",
              "green",
              1500,
              icon
            );
          } else {
            const response = await api.post(
              "/update-bid/",
              {
                bid: this.userBid,
                vehicle_vin: this.vehicleVIN,
                userID: store.state.userID,
              },
              {
                headers: {
                  "X-CSRFToken": store.getters.csrfToken,
                },
                withCredentials: true,
              }
            );
            if (response.status === 200) {
              this.currentVehicleBid = Math.round(
                response.data.car.highest_bid
              );
              let icon = require("@/assets/paper-clip-svg.svg");
              this.$root.showNotificationBar(
                "Bid Placed Successfuly",
                "green",
                1500,
                icon
              );
            } else {
              let icon = require("@/assets/cross.svg");
              this.$root.showNotificationBar(
                "Bid Placed Failed",
                "red",
                1500,
                icon
              );
            }
          }
        } catch (error) {
          let icon = require("@/assets/cross.svg");
          this.$root.showNotificationBar(
            "Bid Placed Failed",
            "red",
            1500,
            icon
          );
        }
      } else {
        this.$root.flipLoginModalVisibility();
      }
    },
    incrementBid() {
      const bid = Number(this.userBid);
      this.userBid = bid + 50; // Increment the user's bid by 100 (adjust as needed)
      if (this.userBid < this.currentVehicleBid) {
          this.currentVehicleBid = this.userBid;
        }
      else{
        this.currentVehicleBid = this.userBid;
      }
    },
    decrementBid() {
      if (this.userBid > this.currentBid) {
        const bid = Number(this.userBid);
        this.userBid = bid - 50; // Decrement the user's bid by 100 (adjust as needed)
        if (this.userBid < this.currentVehicleBid) {
          this.currentVehicleBid = this.userBid;
        }
      }
    },
    updateCurrentBid() {
      if (this.userBid > this.currentVehicleBid) {
        this.currentVehicleBid = this.userBid;
      }
    },
    updateTimeRemaining() {
      const total = Date.parse(this.currentSaleDate) - Date.parse(new Date());
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const seconds = Math.floor((total / 1000) % 60);
      if (minutes <= 0 && days <= 0 && hours <= 0 && seconds <= 0) {
        this.formattedTimeRemaining = "Auction is over!";
        this.auctionLive = false;
        if (this.ws) {
          this.ws.close();
        }
      } else {
        this.auctionLive = true;
        this.formattedTimeRemaining = `${days}D ${hours}H ${minutes}M ${seconds}S`;
      }
      if (minutes < 5 && days === 0 && hours === 0) {
        if (this.ws === null) {
          const route =
            process.env.NODE_ENV === "production"
              ? process.env.VUE_APP_PROD_API_URI
              : process.env.VUE_APP_API_URI;
          this.ws = new WebSocket(`ws://${route}/bidding/`);
        }
        this.ws.onopen = (event) => {
          // console.log("WebSocket connection opened");
        };
        this.ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === "update") {
            const saleDate = data.sale_date;
            const bidAmount = data.bid_amount;
            this.currentSaleDate = saleDate;
            this.currentVehicleBid = bidAmount;
            const total = Date.parse(this.saleDate) - Date.parse(new Date());
            const days = Math.floor(total / (1000 * 60 * 60 * 24));
            const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((total / 1000 / 60) % 60);
            const seconds = Math.floor((total / 1000) % 60);
            this.timeRemaining = `${days}D   ${hours}H   ${minutes}M ${seconds}S`;
          }
        };
        this.ws.onerror = (event) => {
          console.error("WebSocket error:", event);
        };
        this.ws.onclose = (event) => {
          let icon = require("@/assets/paper-clip-svg.svg");
          this.$root.showNotificationBar(
            "Auction Is Over. Thank you for participating!",
            "red",
            3000,
            icon
          );
          // send a request to declar the winner of the auction
          api.post(
            "declare-winner/",
            {
              carID: this.car.id,
            },
            {
              headers: {
                "X-CSRFToken": store.getters.csrfToken,
              },
              withCredentials: true,
            }
          );

        };
      } else {
        //updating the current bid when user increments bid
        setInterval(this.updateCurrentBid, 10);
      }
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




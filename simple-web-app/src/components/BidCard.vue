<template>
  <div class="card pd-24px---18px---28px" style="margin-top: 24px">
    <div class="mg-bottom-8px">
      <div class="text-300 bold color-neutral-800">Current Bid: ${{ currentBid }}</div>
    </div>
    <div class="grid-3-columns mg-bottom-4px" style="display: flex; margin-top: 24px; justify-content: center">
      <a href="#" class="btn-primary w-inline-block" @click="decrementBid" style="background: #ff5733; border-color: #ff5733"><div class="flex-horizontal gap-column-4px">-</div></a>
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
      <a href="#" class="btn-primary w-inline-block" @click="incrementBid" style="background: #9EEF79; border-color: #9EEF79"><div class="flex-horizontal gap-column-4px">+</div></a>
    </div>
    <a href="#" class="btn-primary w-inline-block" style="margin-top: 24px; width: 100%"><div class="flex-horizontal gap-column-4px" @click="submitBid()">PLACE BID</div></a>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import store from "../main.js";

export default {
  props: {
    startingBid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentBid: 1500, // Initial current bid value
      userBid: 1500, // Initial user's bid value
    };
  },
  mounted() {
    const startingBidNumber = Number(this.startingBid);
    this.currentBid = startingBidNumber.toFixed(0);
    this.userBid = startingBidNumber.toFixed(0);
  },
  methods: {
    submitBid() {
      if (store.getters.isLoggedIn){
        const icon = require('@/assets/paper-clip-svg.svg');
        this.$root.showNotificationBar('Bid Placed Successfuly', 'green', 500, icon)
      } else{
          this.$root.flipLoginModalVisibility()
      }

    },
    incrementBid() {
      const bid = Number(this.userBid)
      this.userBid = bid + 50; // Increment the user's bid by 100 (adjust as needed)
    },
    decrementBid() {
      if (this.userBid > this.currentBid) {
        const bid = Number(this.userBid)
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





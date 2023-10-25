<template>
  <div class="card border-none" style="margin-top: 24px">
    <div>
      <div class="data-table-row table-header">
        <div
          id="w-node-b5abc023-9406-e29e-4a73-d0657c71dff6-7c71dff2"
          class="text-50 bold color-neutral-700"
        >
          Sale Information
        </div>
      </div>
      <div class="rows">
        <div
          class="data-table-row"
          style="
            grid-template-columns: 0.2fr 2fr auto;
            padding-top: 7px;
            padding-bottom: 7px;
          "
          v-for="(sale, index) in sales"
          :key="index"
        >
          <div class="logo">
            <img src="../assets/car-svg.svg" alt="Logo" />
          </div>
          <div class="text-100 bold color-neutral-800">{{ sale.label }}</div>
          <a href="#" class="btn-primary w-inline-block" @click="makeRequest()"
            ><div class="flex-horizontal gap-column-4px">View Report</div></a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "../../axios"
export default {
  data() {
    return {
      sales: [
        { label: "Sale Name", link: "#" },
        { label: "Sale Location", link: "#" },
        { label: "Sale Date", link: "#" },
        { label: "Last Updated", link: "#" },
      ],
    };
  },
  methods: {
    makeRequest() {
        api.get("test/")
        .then((response) => {
          this.responseData = response.data; // Handle the response data
          console.log(this.responseData)
        })
        .catch((error) => {
          console.error("Error:", error); // Handle errors
        });
    },
  },
};
</script>

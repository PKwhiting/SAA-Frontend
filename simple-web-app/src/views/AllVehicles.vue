<template>
  <div class="vehicle-list">
    <div id="data-table" class="mg-bottom-16px">
      <h2 class="text-500 bold mg-bottom-12px">All Vehicles</h2>
      <div class="card component-card">
        <div class="grid-1-column">
          <div class="card overflow-hidden border-none">
            <div class="overflow-auto">
              <div class="data-table-row table-header">
                <div class="text-50 bold color-neutral-700">Image</div>
                <div class="text-50 bold color-neutral-700 hide-mobile">Lot Location</div>
                <div class="text-50 bold color-neutral-700">Vehicle Info</div>
                <div class="text-50 bold color-neutral-700 hide-mobile">Sale Info</div>
                <div class="text-50 bold color-neutral-700 hide-tablet">Bid</div>
              </div>
              <div class="rows">
                <div class="data-table-row" v-for="car in cars" :key="car.id">
                  <div>
                    <a :href="getCarUrl(car.id)"
                      ><img :src="car.images[0]" alt="Vehicle thumbnail"
                    /></a>
                  </div>
                  <div class="hide-mobile">
                    <a :href="getCarUrl(car.id)">{{ car.vehicle_location.toUpperCase() }}</a>
                  </div>
                  <div>
                    <a :href="getCarUrl(car.id)"
                      >{{ car.year }} {{ car.make }} {{ car.model }}</a
                    ><br />
                    <a :href="getCarUrl(car.id)">{{ maskNumber(car.VIN) }}</a>
                  </div>
                  <div class="hide-mobile">
                    <a :href="getCarUrl(car.id)">{{ new Date(car.sale_date).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}</a>
                  </div>
                  <div class="hide-tablet">
                    <!-- <a :href="getCarUrl(car.id)">{{ car.bids }}</a> -->
                    <bid-card :currentBid="car.current_bid" :vehicleVIN="car.VIN" :saleDate="new Date(car.sale_date)" style="transform: scale(0.5);margin: -45px -40% -45px -35%;"></bid-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../axios";
import BidCard from "../components/BidCard.vue";

export default {
  name: "VehicleList",
  components: {
    BidCard,
  },
  data() {
    return {
      cars: [],
    };
  },
  mounted() {
    this.fetchCars();
  },
  methods: {
    maskNumber(number) {
      const lastFourDigits = number.toString().slice(-4); // Extract the last 4 digits of the number
      const asterisks = "*".repeat(number.toString().length - 4); // Create a string of asterisks with the same length as the original number minus 4
      return asterisks + lastFourDigits; // Combine the asterisks and last 4 digits to create the masked number
    },
    fetchCars() {
      api
        .get("all_active_vehicles/")
        .then((response) => {
          this.cars = response.data.cars;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getCarUrl(carId) {
      return `/single-car-view/${carId}`;
    },
  },
};
</script>

<style scoped>
.data-table-row {
  max-width: 100%;
  min-width: auto;
  text-align: left;
  padding: 0;
  grid-template-columns: 1fr 1fr 1fr 1fr 1.25fr;;
}
.table-header.data-table-row {
  padding:12px;
  text-align: left;
}
.vehicle-list {
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #333;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 8px;
  text-align: left;
  vertical-align: top;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

img {
  max-width: 100px;
  max-height: 100px;
}

/* Hide columns on mobile */
@media (max-width: 767px) {
  .hide-mobile {
    display: none;
  }
  .data-table-row {
    grid-template-columns: 1fr 1fr;
  }
}

/* Hide columns on tablet */
@media (max-width: 991px) {
  .hide-tablet {
    display: none;
  }
}
</style>
<template>
  <div class="vehicle-list">
    <div id="data-table" class="mg-bottom-16px">
      <h2 class="text-500 bold mg-bottom-12px">Live Vehicles</h2>
      <div class="filter-container" style="display: grid; grid-template-columns: auto auto auto auto auto; column-gap: 12px">
        <div class="hide-tablet hide-mobile">
          <label for="sale-date-filter">Sale Date</label>
          <div>
            <input
              type="date"
              class="input w-input"
              maxlength="256"
              name="Name"
              data-name="Name"
              placeholder="Placeholder"
              id="sale-date-filter"
              v-model="filters.saleDate"
            />
          </div>
        </div>
        <div class="hide-tablet hide-mobile">
          <label for="year-filter">Year</label>
          <div>
            <input
              type="text"
              class="input w-input"
              maxlength="256"
              name="Name"
              data-name="Name"
              placeholder="Placeholder"
              id="year-filter"
              v-model="filters.year"
            />
          </div>
        </div>
        <div class="hide-tablet hide-mobile">
          <label for="make-filter">Make</label>
          <div>
            <input
              type="text"
              class="input w-input"
              maxlength="256"
              name="Name"
              data-name="Name"
              placeholder="Placeholder"
              id="make-filter"
              v-model="filters.make"
            />
          </div>
        </div>
        <div class="hide-tablet hide-mobile">
          <label for="bid-amount-filter">Bid Amount</label>
          <div>
            <input
              type="number"
              class="input w-input"
              maxlength="256"
              name="Name"
              data-name="Name"
              placeholder="Placeholder"
              id="bid-amount-filter"
              v-model="filters.bidAmount"
            />
          </div>
        </div>
        <div class="buttons-row gap-column-12">
          <button class="btn-primary w-inline-block hide-tablet hide mobile" style="margin-top: 28px; height: 39px" @click="applyFilters">
            Apply Filters
          </button>
          <button
            class="btn-primary w-inline-block hide-desktop"
            @click="showFiltersModal = true"
            style="margin-top: 28px; height: 39px"
          >
            Filters
          </button>
        </div>
      </div>
      <div class="card component-card">
        <div class="grid-1-column">
          <div class="card overflow-hidden border-none">
            <div class="overflow-auto">
              <div class="data-table-row table-header">
                <div class="text-50 bold color-neutral-700">Image</div>
                <div class="text-50 bold color-neutral-700 hide-mobile">
                  Lot Location
                </div>
                <div class="text-50 bold color-neutral-700">Vehicle Info</div>
                <div class="text-50 bold color-neutral-700 hide-mobile">
                  Sale Info
                </div>
                <div class="text-50 bold color-neutral-700 hide-tablet">
                  Bid
                </div>
              </div>
              <div class="rows">
                <div
                  class="data-table-row"
                  v-for="car in filteredCars"
                  :key="car.id"
                >
                  <div>
                    <a :href="getCarUrl(car.id)"
                      ><img :src="car.images[0]" alt="Vehicle thumbnail"
                    /></a>
                  </div>
                  <div class="hide-mobile">
                    <a :href="getCarUrl(car.id)">{{
                      car.vehicle_location.toUpperCase()
                    }}</a>
                  </div>
                  <div>
                    <a :href="getCarUrl(car.id)"
                      >{{ car.year }} {{ car.make }} {{ car.model }}</a
                    ><br />
                    <a :href="getCarUrl(car.id)">{{ maskNumber(car.VIN) }}</a>
                  </div>
                  <div class="hide-mobile">
                    <a :href="getCarUrl(car.id)">{{
                      new Date(car.sale_date).toLocaleString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    }}</a>
                  </div>
                  <div class="hide-tablet">
                    <bid-card
                      :currentBid="car.highest_bid"
                      :vehicleVIN="car.VIN"
                      :saleDate="new Date(car.sale_date)"
                      style="
                        transform: scale(0.65);
                        margin: -35px -25% -35px -30%;
                      "
                    ></bid-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal" v-if="showFiltersModal">
        <div class="modal-overlay" @click="showFiltersModal = false"></div>
        <div class="modal-container">
          <div class="modal-header">
            <h3 class="modal-title">Filters</h3>
            <button class="modal-close" @click="showFiltersModal = false">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <div class="filter-container">
              <div>
                <label for="sale-date-filter">Sale Date</label>
                <div>
                  <input
                    type="date"
                    class="input w-input"
                    maxlength="256"
                    name="Name"
                    data-name="Name"
                    placeholder="Placeholder"
                    id="sale-date-filter"
                    v-model="filters.saleDate"
                  />
                </div>
              </div>
              <div>
                <label for="year-filter">Year</label>
                <div>
                  <input
                    type="text"
                    class="input w-input"
                    maxlength="256"
                    name="Name"
                    data-name="Name"
                    placeholder="Placeholder"
                    id="year-filter"
                    v-model="filters.year"
                  />
                </div>
              </div>
              <div>
                <label for="make-filter">Make</label>
                <div>
                  <input
                    type="text"
                    class="input w-input"
                    maxlength="256"
                    name="Name"
                    data-name="Name"
                    placeholder="Placeholder"
                    id="make-filter"
                    v-model="filters.make"
                  />
                </div>
              </div>
              <div>
                <label for="bid-amount-filter">Bid Amount</label>
                <div>
                  <input
                    type="number"
                    class="input w-input"
                    maxlength="256"
                    name="Name"
                    data-name="Name"
                    placeholder="Placeholder"
                    id="bid-amount-filter"
                    v-model="filters.bidAmount"
                  />
                </div>
              </div>
              <div class="buttons-row gap-column-12">
                <button
                  class="btn-primary w-inline-block"
                  @click="applyFilters"
                  style="margin-top: 28px; height: 39px"
                >
                  Apply Filters
                </button>
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
      filters: {
        saleDate: "",
        year: "",
        make: "",
        bidAmount: "",
      },
      showFiltersModal: false,
    };
  },
  mounted() {
    this.fetchCars();
  },
  computed: {
    filteredCars() {
      let filtered = this.cars.filter((car) => {
        return new Date(car.sale_date) >= new Date();
      });
      if (this.filters.year) {
        filtered = filtered.filter((car) => {
          return car.year.toString().includes(this.filters.year);
        });
      }
      if (this.filters.make) {
        filtered = filtered.filter((car) => {
          return car.make
            .toLowerCase()
            .includes(this.filters.make.toLowerCase());
        });
      }
      if (this.filters.bidAmount) {
        filtered = filtered.filter((car) => {
          return car.highest_bid >= this.filters.bidAmount;
        });
      }
      return filtered;
    },
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
    applyFilters() {
      // Fetch the cars again to ensure that we have the latest data
      this.fetchCars();
      this.showFiltersModal = false;
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1.25fr;
}
.table-header.data-table-row {
  padding: 12px;
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
  max-width: 150;
  max-height: 200px;
}

/* Hide columns on mobile */
@media (max-width: 767px) {
  .hide-mobile {
    display: none;
  }
  .data-table-row {
    grid-template-columns: 1fr 1fr;
  }
  .hide-desktop {
    display: block;
  }
}

/* Hide columns on tablet test */
@media (max-width: 991px) {
  .hide-tablet {
    display: none;
  }
}
/* Hide columns on desktop test */
@media (min-width: 992px) {
  .hide-desktop {
    display: none;
  }
}


/* Filter styles */
.filter-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1em;
}

.filter-container > div {
  margin-right: 1em;
  margin-bottom: 1em;
}

.filter-container label {
  margin-right: 0.5em;
}

.filter-container input {
  padding: 0.5em;
  border-radius: 0.25em;
  border: 1px solid #ccc;
}

.filter-container button {
  padding: 0.5em 1em;
  border-radius: 0.25em;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.filter-container button:hover {
  background-color: #0069d9;
}

.filter-container button:active {
  background-color: #005cbf;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  position: relative;
  background-color: #fff;
  border-radius: 0.25em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 1em;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
}

.modal-title {
  font-size: 1.5em;
  font-weight: bold;
}

.modal-close {
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.modal-close:hover {
  color: #000;
}

.modal-body {
  padding: 1em;
}
</style>
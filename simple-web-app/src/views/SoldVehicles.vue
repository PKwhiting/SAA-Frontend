<template>
  <div class="vehicle-list">
    <div id="data-table" class="mg-bottom-16px">
      <div class="header-container">
        <h2 class="text-500 bold">Vehicle Listings</h2>
        <button class="btn-primary btn-filter" @click="showFiltersModal = true">
          <i class="fas fa-filter"></i> Start Filtering Here
        </button>
      </div>
      <div class="card component-card">
        <div class="grid-1-column">
          <div class="card overflow-hidden border-none">
            <div class="overflow-auto">
              <div class="data-table-row table-header">
                <div class="text-50 bold color-neutral-700">Image</div>
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
                  v-for="car in displayedCars"
                  :key="car.id"
                >
                  <div>
                    <a :href="getCarUrl(car.id)"
                      ><img :src="car.images[0]" alt="Vehicle thumbnail"
                    /></a>
                  </div>
                  <div style="display: flex; flex-wrap: wrap">
                    <a :href="getCarUrl(car.id)"
                      >{{ car.year }}
                      {{ car.make }}
                      {{ car.model }}<br /></a
                    ><br />
                    <div style="flex-basis: 100%; margin-top: 5px">
                      <a :href="getCarUrl(car.id)"
                        ><div class="color-badge green">
                          {{ maskNumber(car.VIN) }}
                        </div></a
                      >
                    </div>
                    <div style="flex-basis: 100%; margin-top: 5px">
                      <a :href="getCarUrl(car.id)"
                        ><div class="neutral-badge neutral-300">
                          ODO: {{ car.mileage.toLocaleString() }}
                        </div></a
                      >
                    </div>
                    <br />
                    <div
                      style="display: block; flex-basis: 100%; margin-top: 5px"
                    >
                      <SaveIcon
                        v-if="
                          car &&
                          isCarSaved(car.id) !== null &&
                          isCarSaved(car.id) !== undefined
                        "
                        :carId="car.id"
                        :isSavedInitially="isCarSaved(car.id)"
                      />
                      <img
                        v-if="car.vehicle_starts"
                        src="@/assets/green-checkmark.svg"
                        alt="Green checkmark"
                        class="max-w-20px"
                        style="
                          margin-left: 5px;
                          margin-top: 0px;
                          margin-right: 5px;
                        "
                      />
                      <a
                        class="hide-desktop hide-tablet"
                        v-bind:href="car.vehicle_auction_link"
                        target="_blank"
                        style="margin-left: 5px"
                        ><div class="primary-badge">
                          Go to {{ car.auction }}
                        </div></a
                      >
                    </div>
                  </div>
                  <div class="hide-mobile">
                    <div
                      style="flex-basis: 100%; margin-top: 5px"
                      class="hide-desktop hide-mobile"
                    >
                      <a v-bind:href="car.vehicle_auction_link" target="_blank"
                        ><div class="primary-badge">
                          Go to {{ car.auction }}
                        </div></a
                      >
                    </div>
                    <a :href="getCarUrl(car.id)">{{
                      new Date(car.sale_date).toLocaleString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}</a>
                    <br />
                    <a :href="getCarUrl(car.id)">{{ car.state.state_name }}</a>
                  </div>
                  <div class="hide-tablet hide-mobile">
                    <bid-card
                      :car="car"
                      :currentBid="
                        car.highest_bid !== null ? car.highest_bid : '0'
                      "
                      :vehicleVIN="car.VIN"
                      :saleDate="new Date(car.sale_date)"
                      style="
                        transform: scale(0.65);
                        margin: -35px -25% -35px -30%;
                      "
                    ></bid-card>
                    <!-- <a
                      data-w-id="dc3b625c-4a68-4ebe-9b74-d3193fa9f32f"
                      v-bind:href="car.vehicle_auction_link"
                      target="_blank"
                      class="btn-primary w-inline-block"
                      style="margin-left: 10px"
                      ><div class="flex-horizontal gap-column-4px">
                        <div>Go to Copart</div>
                        <img
                          src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646cdd3a1fe350c45874c7ce_primary-button-icon-right-dashflow-webflow-template.svg"
                          loading="eager"
                          alt=""
                          class="link-icon arrow-right"
                          style="
                            transform: translate3d(0px, 0px, 0px)
                              scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg)
                              rotateZ(0deg) skew(0deg, 0deg);
                            transform-style: preserve-3d;
                          "
                        /></div
                    ></a> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <ul>
            <li>
              <button @click="changePage('prev')">&lt;</button>
            </li>
            <li
              v-for="pageNumber in pageNumbers"
              :key="pageNumber"
              style="padding-left: 0px"
            >
              <button @click="changePage(pageNumber)">{{ pageNumber }}</button>
            </li>
            <li v-if="currentPage + 5 <= totalPages">
              <button @click="changePage('next')">&gt;</button>
            </li>
          </ul>
        </div>
      </div>
      <FilterModal
        :parentFilters="filters"
        :showFiltersModal="showFiltersModal"
        @toggle-filter-modal="toggleFilterModal()"
        @apply-filters="applyFilters"
      />
    </div>
  </div>
</template>

<script>
import api from "../../axios";
import BidCard from "../components/BidCard.vue";
import SaveIcon from "../components/SaveIcon.vue";
import store from "../store";
import FilterModal from "../components/FilterModal.vue";

export default {
  components: {
    BidCard,
    SaveIcon,
    FilterModal,
  },
  data() {
    return {
      cars: null,
      saved_cars: null,
      filters: {
        year: {
          start: "",
          end: "",
        },
        make: "",
        model: "",
        vehicleStarts: false,
        damageFields: {
          Doors: [
            {
              id: "driver_door_damage",
              name: "driver_door_damage",
              label: "Driver Door",
              value: false,
            },
            {
              id: "passenger_door_damage",
              name: "passenger_door_damage",
              label: "Passenger Door",
              value: false,
            },
            {
              id: "driver_rear_door_damage",
              name: "driver_rear_door_damage",
              label: "Driver Rear Door",
              value: false,
            },
            {
              id: "passenger_rear_door_damage",
              name: "passenger_rear_door_damage",
              label: "Passenger Rear Door",
              value: false,
            },
          ],
          Lights: [
            {
              id: "driver_headlight_damage",
              name: "driver_headlight_damage",
              label: "Driver Headlight",
              value: false,
            },
            {
              id: "passenger_headlight_damage",
              name: "passenger_headlight_damage",
              label: "Passenger Headlight",
              value: false,
            },
            {
              id: "driver_tail_light_damage",
              name: "driver_tail_light_damage",
              label: "Driver Tail Light",
              value: false,
            },
            {
              id: "passenger_tail_light_damage",
              name: "passenger_tail_light_damage",
              label: "Passenger Tail Light",
              value: false,
            },
          ],
          Panels: [
            {
              id: "hood_damage",
              name: "hood_damage",
              label: "Hood",
              value: false,
            },
            {
              id: "roof_damage",
              name: "roof_damage",
              label: "Roof",
              value: false,
            },
            {
              id: "driver_fender_damage",
              name: "driver_fender_damage",
              label: "Driver Fender",
              value: false,
            },
            {
              id: "passenger_fender_damage",
              name: "passenger_fender_damage",
              label: "Passenger Fender",
              value: false,
            },
            {
              id: "driver_rear_quarter_damage",
              name: "driver_rear_quarter_damage",
              label: "Driver Rear Quarter",
              value: false,
            },
            {
              id: "passenger_rear_quarter_damage",
              name: "passenger_rear_quarter_damage",
              label: "Passenger Rear Quarter",
              value: false,
            },
            {
              id: "trunk_damage",
              name: "trunk_damage",
              label: "Trunk",
              value: false,
            },
            {
              id: "rear_bumper_damage",
              name: "rear_bumper_damage",
              label: "Rear Bumper",
              value: false,
            },
            {
              id: "driver_mirror_damage",
              name: "driver_mirror_damage",
              label: "Driver Mirror",
              value: false,
            },
            {
              id: "passenger_mirror_damage",
              name: "passenger_mirror_damage",
              label: "Passenger Mirror",
              value: false,
            },
            {
              id: "truck_bed_damage",
              name: "truck_bed_damage",
              label: "Truck Bed",
              value: false,
            },
          ],
          Glass: [
            {
              id: "windshield_damage",
              name: "windshield_damage",
              label: "Windshield",
              value: false,
            },
            {
              id: "driver_window_damage",
              name: "driver_window_damage",
              label: "Driver Window",
              value: false,
            },
            {
              id: "passenger_window_damage",
              name: "passenger_window_damage",
              label: "Passenger Window",
              value: false,
            },
            {
              id: "driver_rear_window_damage",
              name: "driver_rear_window_damage",
              label: "Driver Rear Window",
              value: false,
            },
            {
              id: "passenger_rear_window_damage",
              name: "passenger_rear_window_damage",
              label: "Passenger Rear Window",
              value: false,
            },
            {
              id: "back_glass_damage",
              name: "back_glass_damage",
              label: "Back Glass",
              value: false,
            },
          ],
        },
      },
      savedFilters: [],
      currentPage: 1,
      pageSize: 10,
      totalPages: 0,
      showFiltersModal: false,
      damageFields: {
        Doors: [
          {
            id: "driver_door_damage",
            name: "driver_door_damage",
            label: "Driver Door",
            value: false,
          },
          {
            id: "passenger_door_damage",
            name: "passenger_door_damage",
            label: "Passenger Door",
            value: false,
          },
          {
            id: "driver_rear_door_damage",
            name: "driver_rear_door_damage",
            label: "Driver Rear Door",
            value: false,
          },
          {
            id: "passenger_rear_door_damage",
            name: "passenger_rear_door_damage",
            label: "Passenger Rear Door",
            value: false,
          },
        ],
        Lights: [
          {
            id: "driver_headlight_damage",
            name: "driver_headlight_damage",
            label: "Driver Headlight",
            value: false,
          },
          {
            id: "passenger_headlight_damage",
            name: "passenger_headlight_damage",
            label: "Passenger Headlight",
            value: false,
          },
          {
            id: "driver_tail_light_damage",
            name: "driver_tail_light_damage",
            label: "Driver Tail Light",
            value: false,
          },
          {
            id: "passenger_tail_light_damage",
            name: "passenger_tail_light_damage",
            label: "Passenger Tail Light",
            value: false,
          },
        ],
        Panels: [
          {
            id: "hood_damage",
            name: "hood_damage",
            label: "Hood",
            value: false,
          },
          {
            id: "roof_damage",
            name: "roof_damage",
            label: "Roof",
            value: false,
          },
          {
            id: "driver_fender_damage",
            name: "driver_fender_damage",
            label: "Driver Fender",
            value: false,
          },
          {
            id: "passenger_fender_damage",
            name: "passenger_fender_damage",
            label: "Passenger Fender",
            value: false,
          },
          {
            id: "driver_rear_quarter_damage",
            name: "driver_rear_quarter_damage",
            label: "Driver Rear Quarter",
            value: false,
          },
          {
            id: "passenger_rear_quarter_damage",
            name: "passenger_rear_quarter_damage",
            label: "Passenger Rear Quarter",
            value: false,
          },
          {
            id: "trunk_damage",
            name: "trunk_damage",
            label: "Trunk",
            value: false,
          },
          {
            id: "rear_bumper_damage",
            name: "rear_bumper_damage",
            label: "Rear Bumper",
            value: false,
          },
          {
            id: "driver_mirror_damage",
            name: "driver_mirror_damage",
            label: "Driver Mirror",
            value: false,
          },
          {
            id: "passenger_mirror_damage",
            name: "passenger_mirror_damage",
            label: "Passenger Mirror",
            value: false,
          },
          {
            id: "truck_bed_damage",
            name: "truck_bed_damage",
            label: "Truck Bed",
            value: false,
          },
        ],
        Glass: [
          {
            id: "windshield_damage",
            name: "windshield_damage",
            label: "Windshield",
            value: false,
          },
          {
            id: "driver_window_damage",
            name: "driver_window_damage",
            label: "Driver Window",
            value: false,
          },
          {
            id: "passenger_window_damage",
            name: "passenger_window_damage",
            label: "Passenger Window",
            value: false,
          },
          {
            id: "driver_rear_window_damage",
            name: "driver_rear_window_damage",
            label: "Driver Rear Window",
            value: false,
          },
          {
            id: "passenger_rear_window_damage",
            name: "passenger_rear_window_damage",
            label: "Passenger Rear Window",
            value: false,
          },
          {
            id: "back_glass_damage",
            name: "back_glass_damage",
            label: "Back Glass",
            value: false,
          },
        ],
      },
      vehicleStarts: false,
      filterName: "",
      selectedFilter: "",
    };
  },
  computed: {
    filteredCars() {
      let filtered = this.cars;
      if (this.cars) {
        return filtered;
      }
    },

    pageNumbers() {
      const pageNumbers = [];
      const maxPagesToShow = 5;
      let startPage = Math.max(
        1,
        this.currentPage - Math.floor(maxPagesToShow / 2)
      );
      let endPage = Math.min(startPage + maxPagesToShow - 1, this.totalPages);
      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    },
    displayedCars() {
      if (this.filteredCars) {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.filteredCars;
      } else {
        return [];
      }
    },
  },
  methods: {
    fetchCars(pageNumber = 1) {
      api
        .post(
          `all_active_vehicles/?page=${pageNumber}`,
          {
            makes: this.filters.make,
            models: this.filters.model,
            years: this.filters.year,
            vehicle_starts: this.vehicleStarts,
            damageFields: this.damageFields,
            sold: true,
          },
          {
            headers: {
              "X-CSRFToken": store.getters.csrfToken,
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          this.cars = response.data.cars;
          this.currentPage = pageNumber;
          this.totalPages = response.data.num_pages;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchSavedCars() {
      api
        .get(`saved-vehicles/${store.state.userID}`)
        .then((response) => {
          this.saved_cars = response.data.saved_cars;
        })
        .catch((error) => {
          const icon = require("@/assets/cross.svg");
          this.$root.showNotificationBar(
            "Issue loading saved vehicles. Contact Admin for help.",
            "red",
            3000,
            icon
          );
        });
    },
    changePage(page) {
      if (page === "prev") {
        this.fetchCars(this.currentPage - 1);
      } else if (page === "next") {
        this.fetchCars(this.currentPage + 1);
      } else {
        this.fetchCars(page);
      }
    },
    maskNumber(number) {
      if (number.toString().includes("*")) {
        return number;
      } else {
        const lastFourDigits = number.toString().slice(-4); // Extract the last 4 digits of the number
        const asterisks = "*".repeat(number.toString().length - 4); // Create a string of asterisks with the same length as the original number minus 4
        return asterisks + lastFourDigits; // Combine the asterisks and last 4 digits to create the masked number
      }
    },
    applyFilters(filters) {
      this.filters.make = filters.make;
      this.filters.model = filters.model;
      this.filters.year.start = filters.year.start;
      this.filters.year.end = filters.year.end;
      this.vehicleStarts = filters.vehicleStarts; 
      this.damageFields = filters.damageFields;
      this.fetchCars();
      this.showFiltersModal = false;
    },
    getCarUrl(carId) {
      return `/single-car-view/${carId}`;
    },
    isCarSaved(carId) {
      return this.saved_cars.some((savedCar) => savedCar.id === carId);
    },
    toggleFilterModal() {
      if (this.showFiltersModal) {
        this.showFiltersModal = false;
      } else {
        this.showFiltersModal = true;
      }
    },
  },
  mounted() {
    this.fetchSavedCars();
    this.fetchCars();
  },
};
</script>


<style scoped>
/* Table styles */
.data-table-row {
  max-width: 100%;
  min-width: auto;
  text-align: left;
  padding: 0;
  grid-template-columns: 1fr 1.25fr 1fr 1.25fr;
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

/* Hide columns based on screen size */
@media (max-width: 767px) {
  .hide-mobile {
    display: none;
  }
  .data-table-row {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 767px) and (max-width: 991px) {
  .hide-tablet {
    display: none;
  }
}

@media (min-width: 992px) {
  .hide-desktop {
    display: none;
  }
}

/* Filter styles */
.filter-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  flex-direction: column;
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

/* Form styles */
.input-fields-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.input-fields-container > div {
  width: calc(33.33% - 12px);
  margin-bottom: 24px;
}

.checkboxes-container {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.checkbox-and-label-container {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  width: calc(33.33% - 12px);
}

.checkbox-input {
  margin-left: 10px;
  margin-right: 5px;
  width: 30px;
}

/* Damage fields */
.damage-fields-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.checkbox-and-label-container {
  display: flex;
  align-items: center;
  width: calc(33.33% - 8px);
  margin-top: 12px;
}

.checkbox-label {
  margin-bottom: 0px;
}

/* Pagination styles */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1em;
}

.pagination span {
  font-size: 0.8em;
}

.pagination ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.pagination li {
  margin-right: 0.5em;
}

.pagination button {
  border-radius: 0.25em;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.pagination button:hover {
  background-color: #0069d9;
}

.pagination button:active {
  background-color: #005cbf;
}

.vehicle-list {
  font-family: "Open Sans", sans-serif;
}

/* Improve button styles */
.btn-primary {
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

.btn-primary i {
  margin-right: 8px;
}

.btn-primary:hover {
  background-color: #003d82;
}

.btn-filter {
  font-size: 18px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out;
  margin-top: 10px;
}

.btn-filter:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

/* Style form inputs */
.input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
}

/* Grid layout for checkboxes */
.damage-fields-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 10px;
}

/* Icon for closing modal */
.modal-close {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.5rem;
}

.modal-close:before {
  content: "\00d7"; /* Unicode character for "X" */
}

.checkbox-sections {
  display: block; /* Default block display */
}

.checkbox-section {
  margin-bottom: 20px; /* Add space between sections */
}

.checkbox-section-title {
  font-size: 18px; /* Larger section titles */
  border-bottom: 1px solid #ccc; /* Add a line below the title */
  padding-bottom: 10px; /* Spacing between title and line */
  margin-bottom: 10px; /* Spacing between line and checkboxes */
}

/* Checkbox groups */
.checkbox-group {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(150px, 1fr)
  ); /* Adapt number of columns based on the modal size */
  grid-gap: 10px;
}

.checkbox-and-label-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Adjust space between each checkbox */
}

.checkbox-label {
  white-space: nowrap; /* Keep labels on a single line */
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap; /* Allows items to wrap to the next line on small screens */
}

.text-500.bold {
  font-size: 24px;
  margin: 0;
  flex: 1 1 100%; /* On small screens, the title takes full width */
}

@media (max-width: 767px) {
  .text-500.bold {
    font-size: 20px; /* Smaller font size for the title on small screens */
  }

  .btn-filter {
    width: 100%; /* Full width button on small screens */
    padding: 12px; /* Adjust padding to suit full width button */
    margin-top: 15px; /* Increase space between the title and the button */
  }

  .header-container {
    flex-direction: column; /* Stack the elements vertically on small screens */
  }
}
.filter-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
}

.filter-name-input,
.filter-select {
  flex-grow: 1;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.filter-select {
  background: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>')
    no-repeat right 10px center;
  background-size: 12px;
}

.btn-primary,
.btn-secondary {
  padding: 10px 20px;
  font-size: 16px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
  align-self: center;
  border-radius: 4px;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
}

.btn-primary:not(:last-child) {
  margin-right: 10px;
}

@media (max-width: 767px) {
  .filter-actions {
    flex-direction: column;
  }

  .btn-primary {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
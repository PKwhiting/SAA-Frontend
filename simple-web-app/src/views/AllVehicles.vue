<template>
  <div class="vehicle-list">
    <div id="data-table" class="mg-bottom-16px">
      <h2 class="text-500 bold mg-bottom-12px" style="display: inline-block">
        Live Vehicles
      </h2>
      <button
        class="btn-primary w-inline-block"
        @click="showFiltersModal = true"
        style="
          position: relative;
          top: -5px;
          right: 10px;
          height: 39px;
          float: right;
        "
      >
        Filters
      </button>
      <div class="card component-card">
        <div class="grid-1-column">
          <div class="card overflow-hidden border-none">
            <div class="overflow-auto">
              <div class="data-table-row table-header">
                <div class="text-50 bold color-neutral-700">Image</div>
                <div class="text-50 bold color-neutral-700">Vehicle Info</div>
                <div class="text-50 bold color-neutral-700 hide-mobile">
                  Lot Location
                </div>
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
                  <div>
                    <a :href="getCarUrl(car.id)"
                      >{{ car.year }} {{ car.make }} {{ car.model }}</a
                    ><br />
                    <a :href="getCarUrl(car.id)">{{ maskNumber(car.VIN) }}</a>
                  </div>
                  <div class="hide-mobile">
                    <a :href="getCarUrl(car.id)">{{
                      car.vehicle_location.toUpperCase()
                    }}</a>
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
              <div style="margin-top: 24px">
                <h4>Unused/Undamaged Parts</h4>
                <p>Select the parts you need on the car you are looking for</p>
                <div class="damage-fields-container">
                  <div
                    v-for="field in damageFields"
                    :key="field.id"
                    class="checkbox-and-label-container"
                  >
                    <input
                      type="checkbox"
                      :id="field.id"
                      :name="field.name"
                      class="checkbox-input"
                      v-model="field.value"
                    />
                    <label :for="field.id" class="checkbox-label">{{
                      field.label
                    }}</label>
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
      showDropdown: false,
      cars: [],
      filters: {
        saleDate: "",
        year: "",
        make: "",
        bidAmount: "",
        parts: [],
      },
      showFiltersModal: false,
      damageFields: [
        {
          id: "vehicle_drives",
          name: "vehicle_drives",
          label: "Vehicle Drives",
          value: false,
        },
        {
          id: "vehicle_starts",
          name: "vehicle_starts",
          label: "Vehicle Starts",
          value: false,
        },
        {
          id: "bumper_damage",
          name: "bumper_damage",
          label: "Bumper",
          value: false,
        },
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
        { id: "hood_damage", name: "hood_damage", label: "Hood", value: false },
        { id: "roof_damage", name: "roof_damage", label: "Roof", value: false },
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
        {
          id: "driver_rocker_damage",
          name: "driver_rocker_damage",
          label: "Driver Rocker",
          value: false,
        },
        {
          id: "passenger_rocker_damage",
          name: "passenger_rocker_damage",
          label: "Passenger Rocker",
          value: false,
        },
        {
          id: "driver_rear_wheel_arch_damage",
          name: "driver_rear_wheel_arch_damage",
          label: "Driver Rear Wheel Arch",
          value: false,
        },
        {
          id: "passenger_rear_wheel_arch_damage",
          name: "passenger_rear_wheel_arch_damage",
          label: "Passenger Rear Wheel Arch",
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
        {
          id: "truck_bed_damage",
          name: "truck_bed_damage",
          label: "Truck Bed",
          value: false,
        },
      ],
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
      if (this.damageFields) {
        const checkedParts = [];
        this.damageFields.forEach((field) => {
          if (field.fields) {
            field.fields.forEach((subfield) => {
              if (subfield.value) {
                checkedParts.push(subfield.name);
              }
            });
          } else if (field.value) {
            checkedParts.push(field.name);
          }
        });
        if (checkedParts.length > 0) {
          this.filters.parts = checkedParts;
        } else {
          this.filters.parts = [];
        }
      }
      if (this.filters.parts) {
        filtered = filtered.filter((car) => {
          return this.filters.parts.every((part) => {
            if (part === "vehicle_drives" || part === "vehicle_starts") {
              return car[part];
            } else {
              return !car[part];
            }
          });
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
  margin-right: 8px;
}
.damage-fields-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
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

.checkbox-input {
  margin-right: 8px;
}

.checkbox-label {
  margin-bottom: 0px;
}
</style>
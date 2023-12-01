<template>
  <div class="modal" v-if="showModal">
    <div class="modal-overlay" @click="$emit('toggleFilterModal')"></div>
    <div class="modal-container">
      <div class="modal-header">
        <h3 class="modal-title">Filters</h3>
        <button class="modal-close" @click="$emit('toggleFilterModal')">
          ×
        </button>
      </div>
      <div class="modal-body">
        <div class="filter-container">
          <!-- Year Start Filter -->
          <div>
            <label for="year-start-filter">Year Start</label>
            <div>
              <input
                type="text"
                class="input w-input"
                maxlength="4"
                id="year-start-filter"
                v-model="filters.year.start"
              />
            </div>
          </div>

          <!-- Year End Filter -->
          <div>
            <label for="year-end-filter">Year End</label>
            <div>
              <input
                type="text"
                class="input w-input"
                maxlength="4"
                id="year-end-filter"
                v-model="filters.year.end"
              />
            </div>
          </div>

          <!-- Make Filter -->
          <div>
            <label for="make-filter">Make</label>
            <div>
              <input
                type="text"
                class="input w-input"
                maxlength="256"
                id="make-filter"
                v-model="filters.make"
              />
            </div>
          </div>

          <!-- Model Filter -->
          <div>
            <label for="model-filter">Model</label>
            <div>
              <input
                type="text"
                class="input w-input"
                maxlength="256"
                id="model-filter"
                v-model="filters.model"
              />
            </div>
          </div>

          <!-- Save Filter Section for Logged In Users -->
          <div
            v-if="isLoggedIn"
            class="filter-container"
            style="margin-right: 1em; margin-top: 3em"
          >
            <input
              type="text"
              placeholder="Filter name"
              v-model="filterName"
              class="filter-name-input input w-input"
            />
            <button
              class="btn-primary"
              @click="saveFilter"
              :disabled="selectedFilter !== null"
              style="min-width: 100%; margin-top: 12px; height: 35px"
            >
              Save Filter
            </button>

            <div
              class="filter-dropdown-container"
              style="margin-top: 2em; display: flex; align-items: center"
            >
              <select
                v-model="selectedFilter"
                @change="loadFilter(selectedFilter)"
                class="filter-select input"
                style="height: 50px"
              >
                <option disabled value="">Select a filter</option>
                <option
                  v-for="filter in savedFilters"
                  :key="filter.id"
                  :value="filter"
                  
                >
                  {{ filter.name }}
                </option>
              </select>
              <button
                class="btn-clear btn-primary"
                @click="clearSelectedFilter"
                style="margin-left: 10px; height: 50px"
              >
                Clear Filter
              </button>
            </div>
          </div>

          <!-- Apply Filters Button -->
          <div class="buttons-row">
            <button
              class="btn-primary"
              @click="applyFilters"
              style="min-width: 100%; height: 35px"
            >
              Apply Filters
            </button>
          </div>
          <div style="margin-top: 24px">
            <h4>Unused/Undamaged Parts</h4>
            <p>Select the parts you need on the car you are looking for</p>
            <div>
              <div class="standalone-checkbox" style="display: flex">
                <input
                  type="checkbox"
                  id="vehicle_starts"
                  name="vehicle_starts"
                  class="checkbox-input"
                  v-model="filters.vehicleStarts"
                  style="width: 30px; margin-bottom: 30px"
                />
                <label for="vehicle_starts" class="checkbox-label"
                  >Vehicle Starts</label
                >
              </div>
            </div>
            <div class="checkbox-sections">
              <div
                class="checkbox-section"
                v-for="(items, section) in filters.damageFields"
                :key="section"
              >
                <h5 class="checkbox-section-title">{{ section }}</h5>
                <div class="checkbox-group">
                  <div
                    class="checkbox-and-label-container"
                    v-for="field in items"
                    :key="field.id"
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
import store from "../store";

export default {
  emits: ["toggleFilterModal", "applyFilters", "saveFilter"],
  props: {
    parentFilters: {
      type: Object,
      default: {},
    },
    showFiltersModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filterName: "",
      selectedFilter: null,
      savedFilters: [],
      showModal: false,
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
      defaultFilters: {
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
    };
  },
  watch: {
    showFiltersModal(newValue) {
      this.showModal = newValue;
    },
  },
  methods: {
    applyFilters() {
      this.showModal = false;
      this.$emit("applyFilters", this.filters);
    },
    saveFilter(data) {
      this.showModal = true;
      api
        .post(
          `save-filter/${store.state.userID}`,
          {
            name: this.filterName,
            filters: this.filters,
            damageFields: this.filters.damageFields,
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
          this.$root.showNotificationBar(
            "Filter Saved Successfully",
            "green",
            1500,
            icon
          );
          this.showModal = false;
          this.$emit("applyFilters", this.filters);
        })
        .catch((error) => {
          const icon = require("@/assets/cross.svg");
          this.$root.showNotificationBar(
            "Issue saving filter. Contact Admin for help.",
            "red",
            3000,
            icon
          );
        });
    },
    loadFilter(filter) {
      this.filters.make = this.selectedFilter.make
        ? this.selectedFilter.make
        : "";
      this.filters.model = this.selectedFilter.model
        ? this.selectedFilter.model
        : "";
      this.filters.year.start = this.selectedFilter.start
        ? this.selectedFilter.start
        : "";
      this.filters.year.end = this.selectedFilter.end
        ? this.selectedFilter.end
        : "";
      this.filters.vehicleStarts = this.selectedFilter.vehicleStarts
        ? this.selectedFilter.vehicleStarts
        : false;
      this.filters.damageFields = this.selectedFilter.damageFields
        ? this.selectedFilter.damageFields
        : {};
    },
    getSavedFilters() {
      if (!store.getters.isLoggedIn) {
        return;
      }
      api
        .get(`get-saved-filters/${store.state.userID}`)
        .then((response) => {
          this.savedFilters = response.data.filters;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    clearSelectedFilter() {
      this.selectedFilter = null;
      this.filters = {
        ...this.defaultFilters,
      };
    },
  },
  mounted() {
    this.filters = this.parentFilters;
    this.getSavedFilters();
  },
};
</script>

<style scoped>
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

/* Add other specific styles related to the filters form */
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
.checkbox-group {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(150px, 1fr)
  ); /* Adapt number of columns based on the modal size */
  grid-gap: 10px;
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
.btn-primary.btn-primary:disabled {
    background-color: #cccccc;
    background-image: none; /* This will remove the gradient */
    color: #666666;
    cursor: not-allowed;
    transform: none;
    transition: none;
    box-shadow: none;
}

.btn-clear {
  background-color: #f2f2f2;
  color: #333;
  border: 1px solid #ccc;
  padding: 0.5em 1em;
  border-radius: 0.25em;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.btn-clear:hover {
  background-color: #e6e6e6;
}
.filter-dropdown-container {
  display: flex;
  align-items: center;
}

.filter-select {
  flex-grow: 1; /* Adjust if necessary */
  /* Other styles */
}

/* Add any additional CSS needed for the filter form */
</style>
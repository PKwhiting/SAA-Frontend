<template>
  <div v-if="this.car" id="cards" class="pd-top-24px">
    <div>
      <div>
        <div style="display: flex; align-items: center">
          <h2
            class="text-500 bold mg-bottom-12px"
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            {{ car.year }} {{ car.make }} {{ car.model }}
          </h2>
          <div
            style="
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              margin-left: 10px;
            "
          >
            <img
              @click="saveCar(car.id)"
              src="@/assets/heart-svg.svg"
              loading="eager"
              alt="Changelog - Dashflow X Webflow Template"
              style="margin-left: 5px; max-width: 30px"
            />
            <img
              src="@/assets/green-checkmark.svg"
              alt="Green checkmark"
              class="max-w-20px"
              style="margin-left: 10px; max-width: 30px"
              title="Vehicle Runs"
            />
          </div>
        </div>
      </div>
    </div>
    <div id="text-cards" class="mg-bottom-16px">
      <div class="card component-card">
        <div class="grid-2-columns">
          <div class="inner-container _384px _100-tablet">
            <image-viewer v-if="car.images" :images="car.images"></image-viewer>
            <bid-card
              :car="car"
              :currentBid="car.highest_bid !== null ? car.highest_bid : '0'"
              :vehicleVIN="car.VIN"
              :saleDate="new Date(car.sale_date)"
            ></bid-card>
            <sale-info
              :sale_date="car.sale_date"
              :last_updated="car.last_updated"
              :vehicle_location="car.state.state_name"
            ></sale-info>
          </div>
          <div class="inner-container _384px _100-tablet">
            <div class="card border-none">
              <div>
                <div class="data-table-row table-header">
                  <div class="text-50 bold color-neutral-700">
                    Vehicle Details
                  </div>
                  <div class="text-50 bold color-neutral-700"></div>
                </div>
                <div class="rows">
                  <div class="data-table-row">
                    <div class="text-100 bold color-neutral-800">
                      Lot Number
                    </div>
                    <div class="text-100 medium">{{ car.id }}</div>
                  </div>
                  <div class="data-table-row">
                    <div class="text-100 bold color-neutral-800">VIN</div>
                    <div class="text-100 medium">{{ car.VIN }}</div>
                  </div>
                  <div class="data-table-row">
                    <div class="text-100 bold color-neutral-800">
                      Title Code
                    </div>
                    <div class="text-100 medium">
                      {{ car.title_classification }}
                    </div>
                  </div>
                  <div class="data-table-row">
                    <div class="text-100 bold color-neutral-800">Odometer</div>
                    <div class="text-100 medium">{{ car.mileage }}</div>
                  </div>
                  <div class="data-table-row">
                    <div class="text-100 bold color-neutral-800">
                      Odometer Brand
                    </div>
                    <div class="text-100 medium">{{ car.odometer_brand }}</div>
                  </div>
                  <div class="data-table-row">
                    <div class="text-100 bold color-neutral-800">Cylinders</div>
                    <div class="text-100 medium">{{ car.cylinders }}</div>
                  </div>
                  <div class="data-table-row">
                    <div class="text-100 bold color-neutral-800">Color</div>
                    <div class="text-100 medium">{{ car.color }}</div>
                  </div>
                  <div class="data-table-row">
                    <div class="text-100 bold color-neutral-800">
                      Engine Type
                    </div>
                    <div class="text-100 medium">{{ car.engine }}</div>
                  </div>
                  <div class="data-table-row">
                    <div class="text-100 bold color-neutral-800">
                      Transmission
                    </div>
                    <div class="text-100 medium">{{ car.transmission }}</div>
                  </div>
                  <div class="data-table-row">
                    <div class="text-100 bold color-neutral-800">Drive</div>
                    <div class="text-100 medium">{{ car.drive_type }}</div>
                  </div>
                  <div class="data-table-row">
                    <div class="text-100 bold color-neutral-800">
                      Vehicle Type
                    </div>
                    <div class="text-100 medium">{{ car.vehicle_type }}</div>
                  </div>
                  <div class="data-table-row">
                    <div class="text-100 bold color-neutral-800">Fuel</div>
                    <div class="text-100 medium">{{ car.fuel_type }}</div>
                  </div>
                  <div class="data-table-row">
                    <div class="text-100 bold color-neutral-800">Keys</div>
                    <div class="text-100 medium">{{ car.keys }}</div>
                  </div>
                  <div class="data-table-row">
                    <div class="text-100 bold color-neutral-800">
                      Vehicle Starts
                    </div>
                    <div class="text-100 medium">
                      {{ car.vehicle_starts ? "Starts" : "No Start" }}
                    </div>
                  </div>
                  <div class="data-table-row">
                    <div class="text-100 bold color-neutral-800">
                      Vehicle Location
                    </div>
                    <div class="text-100 medium">
                      {{ car.state.state_name }} {{ car.vehicle_zip }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <vehicle-reports :reports="car.reports"></vehicle-reports> -->
            <div class="card border-none" style="margin-top: 24px">
              <div>
                <div class="data-table-row table-header">
                  <div class="text-50 bold color-neutral-700">Parts</div>
                  <div class="text-50 bold color-neutral-700"></div>
                </div>
                <div class="rows">
                  <template v-for="field in damageFields">
                    <div class="data-table-row">
                      <div class="text-100 bold color-neutral-800">
                        {{ field.label }}
                      </div>
                      <div class="text-100 medium">
                        {{ car[field] ? "Damaged" : "Undamaged" }}
                      </div>
                    </div>
                  </template>
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
import ImageViewer from "../components/ImageViewer.vue";
import BidCard from "../components/BidCard.vue";
import SaleInfo from "../components/SaleInfo.vue";
import VehicleReports from "../components/VehicleReports.vue";
import api from "../../axios";
import store from "../store";

export default {
  components: { ImageViewer, BidCard, SaleInfo, VehicleReports },
  data() {
    return {
      car: null,
      damageFields: [
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
    this.fetchCar();
  },
  methods: {
    fetchCar() {
      const carId = this.$route.params.id;
      api
        .get(`single-car/?id=${carId}`)
        .then((response) => {
          this.car = response.data.car;
          console.log(this.car);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveCar(carID) {
      if (!store.getters.isLoggedIn) {
        const icon = require("@/assets/cross.svg");
        this.$root.showNotificationBar(
          "Please log in to save vehicles",
          "red",
          3000,
          icon
        );
        return;
      }

      api
        .post(
          `add-saved-vehicle/${store.state.userID}`,
          {
            carID: carID,
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
            "Vehicle Saved Successfully",
            "green",
            1500,
            icon
          );
        })
        .catch((error) => {
          const icon = require("@/assets/cross.svg");
          this.$root.showNotificationBar(
            "Issue adding vehicle to saved vehicles. Contact Admin for help.",
            "red",
            3000,
            icon
          );
        });
    },
  },
};
</script>



<style scoped>
.input {
  background: green;
}
:global(.dashboard-main-content) {
  text-align: left;
}
.data-table-row.table-header {
  grid-template-columns: 0.6fr 2fr;
}
/* .inner-container._100-tablet {
  overflow-x: hidden;
} */
div.data-table-row {
  grid-template-columns: 0.6fr 1fr;
  max-width: 100%;
  min-width: auto;
  text-align: left;
}
:global(.data-table-row) {
  min-width: none;
}
.data-table-row.table-header {
  grid-template-columns: 2fr auto;
}
</style>
<template>
  <div class="card component-card">
    <div class="mg-bottom-0 w-form">
      <form
        id="vehicle-form"
        name="vehicle-form"
        data-name="Vehicle Form"
        method="get"
        aria-label="Vehicle Form"
        @submit.prevent="submitForm"
        v-bind:action="submitForm"
        ref="vehicleForm"
      >
        <div class="grid-3-columns _1-col-tablet">
          <div>
            <label for="vin">VIN</label>
            <div class="position-relative---z-index-1 flex-horizontal">
              <input
                type="text"
                class="input icon-inside-left w-input"
                maxlength="17"
                name="vin"
                data-name="vin"
                placeholder="Enter vehicle VIN"
                id="vin"
                pattern="[A-HJ-NPR-Z\\d]{17}"
                required
                v-model="vin"
              />
              <!-- <img
                src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646d22faaddd674071e73457_input-search-icon-dashflow-webflow-template.svg"
                loading="eager"
                alt=""
                class="icon-inside-input-left"
              /> -->
              <a
                data-w-id="5228fae3-1046-92bf-afc3-a85185c5a451"
                href="#"
                class="btn-secondary w-inline-block"
                @click="decodeVin"
                style="
                  border-radius: 6px;
                  margin-left: 12px;
                  min-height: 50px;
                  vertical-align: middle;
                  display: flex;
                "
                ><div class="flex-horizontal gap-column-4px">
                  <div>Decode</div>
                </div></a
              >
            </div>
          </div>
          <div>
            <label for="make">Make</label>
            <div>
              <select
                class="input w-select"
                name="make"
                data-name="make"
                id="make"
                v-model="make"
              >
                <option value="">Select make</option>
                <option v-for="make in makes" :key="make" :value="make">
                  {{ make }}
                </option>
              </select>
              <!-- <div class="error-message small">
                <div class="flex align-center gap-column-4px">
                  <img
                    src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                    loading="eager"
                    alt=""
                    class="max-w-12px"
                  />
                  <div class="text-50 medium">This field is required.</div>
                </div>
              </div> -->
            </div>
          </div>
          <div>
            <label for="model">Model</label>
            <div class="position-relative---z-index-1 flex-horizontal">
              <input
                type="text"
                class="input icon-inside-left w-input"
                maxlength="256"
                name="model"
                data-name="model"
                placeholder="Enter vehicle model"
                id="model"
                v-model="model"
              />
              <!-- <img
                src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646d22faaddd674071e73457_input-search-icon-dashflow-webflow-template.svg"
                loading="eager"
                alt=""
                class="icon-inside-input-left"
              /> -->
            </div>
          </div>
          <div>
            <label for="year">Year</label>
            <div>
              <select
                class="input w-select"
                name="year"
                data-name="year"
                id="year"
                v-model="year"
              >
                <option value="">Select year</option>
                <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <label for="color">Color</label>
            <div>
              <select
                class="input w-select"
                name="color"
                data-name="color"
                id="color"
                v-model="color"
              >
                <option value="">Select color</option>
                <option v-for="color in colors" :key="color" :value="color">
                  {{ color }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <label for="odometer">Odometer</label>
            <div class="position-relative---z-index-1 flex-horizontal">
              <input
                type="text"
                class="input icon-inside-left w-input"
                maxlength="256"
                name="odometer"
                data-name="odometer"
                placeholder="Enter vehicle odometer"
                id="odometer"
                v-model="odometer"
              />
              <!-- <img
                src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646d22faaddd674071e73457_input-search-icon-dashflow-webflow-template.svg"
                loading="eager"
                alt=""
                class="icon-inside-input-left"
              /> -->
            </div>
          </div>
          <div>
            <label for="fuel">Fuel</label>
            <div>
              <select
                class="input w-select"
                name="fuel"
                data-name="fuel"
                id="fuel"
                v-model="fuel"
              >
                <option value="">Select fuel</option>
                <option v-for="fuel in fuels" :key="fuel" :value="fuel">
                  {{ fuel }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <label for="transmission">Transmission</label>
            <div>
              <select
                class="input w-select"
                name="transmission"
                data-name="transmission"
                id="transmission"
                v-model="transmission"
              >
                <option value="">Select transmission</option>
                <option
                  v-for="transmission in transmissions"
                  :key="transmission"
                  :value="transmission"
                >
                  {{ transmission }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <label for="drive">Drive</label>
            <div>
              <select
                class="input w-select"
                name="drive"
                data-name="drive"
                id="drive"
                v-model="drive"
              >
                <option value="">Select drive</option>
                <option v-for="drive in drives" :key="drive" :value="drive">
                  {{ drive }}
                </option>
                <option value="4 wheel drive">4 wheel drive</option>
              </select>
            </div>
          </div>
          <div>
            <label for="cylinders">Cylinders</label>
            <div>
              <input
                type="number"
                class="input w-input"
                name="cylinders"
                data-name="cylinders"
                id="cylinders"
                v-model="cylinders"
              />
            </div>
          </div>
          <div>
            <label for="displacement">Displacement</label>
            <div>
              <input
                type="number"
                class="input w-input"
                name="displacement"
                data-name="displacement"
                id="displacement"
                v-model="displacement"
              />
            </div>
          </div>
          <div>
            <label for="engineType">Engine Type</label>
            <div>
              <select
                class="input w-select"
                name="engineType"
                data-name="engineType"
                id="engineType"
                v-model="engineType"
              >
                <option value="">Select engine type</option>
                <option value="I4">I4</option>
                <option value="I4 Turbo">I4 Turbo</option>
                <option value="I6">I6</option>
                <option value="I6 Turbo">I6 Turbo</option>
                <option value="V6">V6</option>
                <option value="V6 Turbo">V6 Turbo</option>
                <option value="V8">V8</option>
                <option value="V8 Turbo">V8 Turbo</option>
                <option value="V10">V10</option>
                <option value="V10 Turbo">V10 Turbo</option>
                <option value="V12">V12</option>
                <option value="V12 Turbo">V12 Turbo</option>
              </select>
            </div>
          </div>
          <div>
            <label for="titleStatus">Title Status</label>
            <div>
              <select
                class="input w-select"
                name="titleStatus"
                data-name="titleStatus"
                id="titleStatus"
                v-model="titleStatus"
              >
                <option value="">Select title status</option>
                <option value="clean">Clean</option>
                <option value="salvage">Salvage</option>
                <option value="junk">Junk</option>
                <option value="export">Export</option>
              </select>
            </div>
          </div>
          <div>
            <label for="numKeys">Number of Keys</label>
            <div>
              <input
                type="number"
                class="input w-input"
                name="numKeys"
                data-name="numKeys"
                id="numKeys"
                v-model="numKeys"
              />
            </div>
          </div>
          <div>
            <label for="location">Vehicle Location (Zip)</label>
            <div>
              <input
                type="text"
                class="input w-input"
                name="location"
                data-name="location"
                id="location"
                v-model="location"
              />
            </div>
          </div>
          <div>
            <label for="vehicleType">Vehicle Type</label>
            <div>
              <select
                class="input w-select"
                name="vehicleType"
                data-name="vehicleType"
                id="vehicleType"
                v-model="vehicleType"
              >
                <option value="">Select vehicle type</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="truck">Truck</option>
                <option value="van">Van</option>
                <option value="coupe">Coupe</option>
                <option value="convertible">Convertible</option>
                <option value="hatchback">Hatchback</option>
                <option value="wagon">Wagon</option>
                <option value="sports car">Sports Car</option>
                <option value="luxury car">Luxury Car</option>
              </select>
            </div>
          </div>
          <div>
            <label for="reservePrice">Reserve Price</label>
            <div class="position-relative---z-index-1 flex-horizontal">
              <input
                type="number"
                class="input icon-inside-left w-input"
                maxlength="256"
                name="reservePrice"
                data-name="reservePrice"
                placeholder="Enter vehicle reserve price"
                id="reservePrice"
              />
              <img
                src="@/assets/dollar-sign.svg"
                loading="eager"
                alt=""
                class="icon-inside-input-left"
              />
            </div>
          </div>
          <div>
            <label for="images">Images</label>
            <div>
              <input
                type="file"
                name="images"
                id="images"
                accept="image/*"
                multiple
                @change="handleImageUpload"
              />
            </div>
          </div>
        </div>
        <div class="flex-horizontal" style="margin-top: 24px">
          <a
            data-w-id="dc3b625c-4a68-4ebe-9b74-d3193fa9f32f"
            href="#"
            class="btn-primary w-inline-block"
            @click="submitForm"
            ><div class="flex-horizontal gap-column-4px">
              <div>Post Vehicle</div>
              <img
                src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646cdd3a1fe350c45874c7ce_primary-button-icon-right-dashflow-webflow-template.svg"
                loading="eager"
                alt=""
                class="link-icon arrow-right"
                style="
                  transform: translate3d(4px, 0px, 0.01px) scale3d(1, 1, 1)
                    rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                  transform-style: preserve-3d;
                "
              /></div
          ></a>
        </div>
      </form>
      <div
        class="success-message w-form-done"
        tabindex="-1"
        role="region"
        aria-label="Vehicle Form success"
      >
        <div>Thank you! Your submission has been received!</div>
      </div>
      <div
        class="error-message w-form-fail"
        tabindex="-1"
        role="region"
        aria-label="Vehicle Form failure"
      >
        <div>Oops! Something went wrong while submitting the form.</div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../axios";
import store from "../store";

export default {
  name: "AddVehicle",
  data() {
    return {
      vin: "",
      make: "",
      model: "",
      year: "",
      color: "",
      odometer: "",
      fuel: "",
      transmission: "",
      drive: "",
      cylinders: "",
      displacement: "",
      engineType: "",
      titleStatus: "",
      vehicleType: "",
      location: "",
      numKeys: "",
      years: Array.from({ length: 44 }, (_, i) => 2023 - i),
      makes: [
        "ACURA",
        "ALFA ROMEO",
        "AUDI",
        "BMW",
        "BUICK",
        "CADILLAC",
        "CHEVROLET",
        "CHRYSLER",
        "DODGE",
        "FIAT",
        "FORD",
        "GMC",
        "HONDA",
        "HYUNDAI",
        "INFINITI",
        "JAGUAR",
        "JEEP",
        "KIA",
        "LAND ROVER",
        "LEXUS",
        "LINCOLN",
        "MASERATI",
        "MAZDA",
        "MERCEDES-BENZ",
        "MINI",
        "MITSUBISHI",
        "NISSAN",
        "PORSCHE",
        "RAM",
        "SUBARU",
        "TOYOTA",
        "VOLKSWAGEN",
        "VOLVO",
      ].sort(),
      colors: [
        "Black",
        "White",
        "Silver",
        "Gray",
        "Red",
        "Blue",
        "Brown",
        "Green",
        "Gold",
        "Orange",
      ],
      fuels: [
        "GASOLINE",
        "DIESEL",
        "ELECTRIC",
        "HYBRID",
        "FLEX FUEL",
        "NATURAL GAS",
      ],
      transmissions: ["AUTOMATIC", "MANUAL", "CVT"],
      drives: ["Two-Wheel Drive", "All-Wheel Drive", "Four-Wheel Drive"],
      images: [],
    };
  },
  methods: {
    async decodeVin() {
      if (this.vin) {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${this.vin}?format=json`
        );
        const data = await response.json();
        if (data.Results) {
          const make = data.Results.find(
            (result) => result.Variable === "Make"
          );
          const model = data.Results.find(
            (result) => result.Variable === "Model"
          );
          const year = data.Results.find(
            (result) => result.Variable === "Model Year"
          );
          const transmission = data.Results.find(
            (result) => result.Variable === "Transmission Style"
          );
          const drive = data.Results.find(
            (result) => result.Variable === "Drive Type"
          );
          const fuel = data.Results.find(
            (result) => result.Variable === "Fuel Type - Primary"
          );
          const cylinders = data.Results.find(
            (result) => result.Variable === "Engine Number of Cylinders"
          );
          const displacement = data.Results.find(
            (result) => result.Variable === "Displacement (L)"
          );
          if (make.Value != null) {
            this.make = make.Value.toUpperCase();
          }
          if (model.Value != null) {
            this.model = model.Value;
          }
          if (year.Value != null) {
            this.year = year.Value;
          }
          if (transmission.Value != null) {
            this.transmission = transmission.Value.toUpperCase();
          }
          if (drive.Value != null) {
            const driveMap = {
              "AWD/All-Wheel Drive": "All-Wheel Drive",
              "4x2": "Two-Wheel Drive",
              "4WD/4-Wheel Drive/4x4": "Four-Wheel Drive",
            };
            this.drive = driveMap[drive.Value] || drive.Value;
          }
          if (fuel.Value != null) {
            this.fuel = fuel.Value.toUpperCase();
          }
          if (cylinders.Value != null) {
            this.cylinders = cylinders.Value;
          }
          if (displacement.Value != null) {
            this.displacement = displacement.Value;
          }
        }
      }
    },
    handleImageUpload(event) {
    const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            this.images.push(file);
        }
    },
    async submitForm() {
        const formData = new FormData();
        for (let i = 0; i < this.images.length; i++) {
            formData.append("images", this.images[i]);
        }
        formData.append("vin", this.vin);
        formData.append("make", this.make);
        formData.append("model", this.model);
        formData.append("year", this.year);
        formData.append("color", this.color);
        formData.append("odometer", this.odometer);
        formData.append("fuel", this.fuel);
        formData.append("transmission", this.transmission);
        formData.append("drive", this.drive);
        formData.append("cylinders", this.cylinders);
        formData.append("displacement", this.displacement);
        formData.append("engineType", this.engineType);
        formData.append("titleStatus", this.titleStatus);
        formData.append("vehicleType", this.vehicleType);
        formData.append("location", this.location);
        formData.append("numKeys", this.numKeys);
        formData.append("userID", store.state.userID)
      try {
        const response = await api.post(
          "/list-vehicle/", 
          formData,
          {
            headers: {
              "X-CSRFToken": store.getters.csrfToken,
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          this.$refs.vehicleForm.reset();
          this.vin = "";
          this.make = "";
          this.model = "";
          this.year = "";
          this.color = "";
          this.odometer = "";
          this.fuel = "";
          this.transmission = "";
          this.drive = "";
          this.cylinders = "";
          this.displacement = "";
          this.engineType = "";
          this.titleStatus = "";
          this.numKeys = "";
          this.location = "";
          this.vehicleType = "";
          this.images = [];
          const icon = require("@/assets/paper-clip-svg.svg");
          this.$root.showNotificationBar(
            "Vehicle Under Review",
            "green",
            3000,
            icon
          );
        } else {
          // Handle error response
          const icon = require("@/assets/paper-clip-svg.svg");
          this.$root.showNotificationBar(
            "Error adding vehicle. Please Contact Admin.",
            "green",
            3000,
            icon
          );
        }
      } catch (error) {
        const icon = require("@/assets/paper-clip-svg.svg");
          this.$root.showNotificationBar(
            "Error adding vehicle. Please Contact Admin.",
            "green",
            3000,
            icon
          );
      }
    },
  },
};
</script>

<style scoped>
.w-select {
  min-height: 50px;
}
.w-input {
  min-height: 50px;
}
</style>
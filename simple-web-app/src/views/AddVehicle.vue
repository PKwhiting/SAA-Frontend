<template>
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
    <div class="card component-card">
      <div class="mg-bottom-0 w-form">
        <!-- <form
                id="vehicle-form"
                name="vehicle-form"
                data-name="Vehicle Form"
                method="get"
                aria-label="Vehicle Form"
                @submit.prevent="submitForm"
                v-bind:action="submitForm"
                ref="vehicleForm"
            > -->
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
            <div v-if="!year && submitted" class="error-message small">
              <div class="flex align-center gap-column-4px">
                <img
                  src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                  loading="eager"
                  alt=""
                  class="max-w-12px"
                />
                <div class="text-50 medium">This field is required.</div>
              </div>
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
              <div v-if="!make && submitted" class="error-message small">
                <div class="flex align-center gap-column-4px">
                  <img
                    src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                    loading="eager"
                    alt=""
                    class="max-w-12px"
                  />
                  <div class="text-50 medium">This field is required.</div>
                </div>
              </div>
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
            <div v-if="!model && submitted" class="error-message small">
              <div class="flex align-center gap-column-4px">
                <img
                  src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                  loading="eager"
                  alt=""
                  class="max-w-12px"
                />
                <div class="text-50 medium">This field is required.</div>
              </div>
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
            <div v-if="!color && submitted" class="error-message small">
              <div class="flex align-center gap-column-4px">
                <img
                  src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                  loading="eager"
                  alt=""
                  class="max-w-12px"
                />
                <div class="text-50 medium">This field is required.</div>
              </div>
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
                placeholder="Enter Vehicle Mileage"
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
            <div v-if="!odometer && submitted" class="error-message small">
              <div class="flex align-center gap-column-4px">
                <img
                  src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                  loading="eager"
                  alt=""
                  class="max-w-12px"
                />
                <div class="text-50 medium">This field is required.</div>
              </div>
            </div>
          </div>
          <div>
            <label for="odometerBranding">Odometer Branding</label>
            <div>
              <select
                class="input w-select"
                name="odometerBranding"
                data-name="odometerBranding"
                id="odometerBranding"
                v-model="odometerBranding"
              >
                <option value="">Select odometer branding</option>
                <option value="ACTUAL">Actual</option>
                <option value="EXEMPT">Exempt</option>
                <option value="NOT ACTUAL">Not Actual</option>
                <option value="INOPERABLE">Inoperable</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div
              v-if="!odometerBranding && submitted"
              class="error-message small"
            >
              <div class="flex align-center gap-column-4px">
                <img
                  src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                  loading="eager"
                  alt=""
                  class="max-w-12px"
                />
                <div class="text-50 medium">This field is required.</div>
              </div>
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
            <div v-if="!fuel && submitted" class="error-message small">
              <div class="flex align-center gap-column-4px">
                <img
                  src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                  loading="eager"
                  alt=""
                  class="max-w-12px"
                />
                <div class="text-50 medium">This field is required.</div>
              </div>
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
            <div v-if="!transmission && submitted" class="error-message small">
              <div class="flex align-center gap-column-4px">
                <img
                  src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                  loading="eager"
                  alt=""
                  class="max-w-12px"
                />
                <div class="text-50 medium">This field is required.</div>
              </div>
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
            <div v-if="!drive && submitted" class="error-message small">
              <div class="flex align-center gap-column-4px">
                <img
                  src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                  loading="eager"
                  alt=""
                  class="max-w-12px"
                />
                <div class="text-50 medium">This field is required.</div>
              </div>
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
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
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
            <div v-if="!engineType && submitted" class="error-message small">
              <div class="flex align-center gap-column-4px">
                <img
                  src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                  loading="eager"
                  alt=""
                  class="max-w-12px"
                />
                <div class="text-50 medium">This field is required.</div>
              </div>
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
                <option value="CLEAN">Clean</option>
                <option value="SALVAGE">Salvage</option>
                <option value="REBUILD">Rebuilt</option>
                <option value="EXPORT ONLY">Export Only</option>
                <option value="PARTS ONLY">Parts Only</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div v-if="!titleStatus && submitted" class="error-message small">
              <div class="flex align-center gap-column-4px">
                <img
                  src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                  loading="eager"
                  alt=""
                  class="max-w-12px"
                />
                <div class="text-50 medium">This field is required.</div>
              </div>
            </div>
          </div>
          <div>
            <label for="numKeys">Title Note</label>
            <div>
              <input
                type="text"
                class="input w-input"
                name="titleNote"
                data-name="titleNote"
                id="titleNote"
                v-model="titleNote"
              />
            </div>
          </div>
          <div>
            <label for="numKeys">Number of Keys</label>
            <div>
              <input
                type="integer"
                class="input w-input"
                name="numKeys"
                data-name="numKeys"
                id="numKeys"
                v-model="numKeys"
              />
            </div>
            <div v-if="!numKeys && submitted" class="error-message small">
              <div class="flex align-center gap-column-4px">
                <img
                  src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                  loading="eager"
                  alt=""
                  class="max-w-12px"
                />
                <div class="text-50 medium">This field is required.</div>
              </div>
            </div>
          </div>
          <div>
            <label for="vehicleZip">Vehicle Location (Zip)</label>
            <div>
              <input
                type="text"
                class="input w-input"
                name="vehicleZip"
                data-name="vehicleZip"
                id="vehicleZip"
                v-model="vehicleZip"
              />
            </div>
            <div v-if="!vehicleZip && submitted" class="error-message small">
              <div class="flex align-center gap-column-4px">
                <img
                  src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                  loading="eager"
                  alt=""
                  class="max-w-12px"
                />
                <div class="text-50 medium">This field is required.</div>
              </div>
            </div>
          </div>
          <div>
            <label for="vehicleState">Vehicle Location (State)</label>
            <div>
              <select
                class="input w-select"
                name="vehicleState"
                data-name="vehicleState"
                id="vehicleState"
                v-model="vehicleState"
              >
                <option value="">Select a State</option>
                <option v-for="state in states" :key="state" :value="state">
                  {{ state.label }}
                </option>
              </select>
            </div>
            <div v-if="!vehicleState && submitted" class="error-message small">
              <div class="flex align-center gap-column-4px">
                <img
                  src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                  loading="eager"
                  alt=""
                  class="max-w-12px"
                />
                <div class="text-50 medium">This field is required.</div>
              </div>
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
            <div v-if="!vehicleType && submitted" class="error-message small">
              <div class="flex align-center gap-column-4px">
                <img
                  src="https://assets.website-files.com/645128e3dbdad55ed2803eff/646e463b97f63d68810f02f6_error-message-icon-dashflow-webflow-template.svg"
                  loading="eager"
                  alt=""
                  class="max-w-12px"
                />
                <div class="text-50 medium">This field is required.</div>
              </div>
            </div>
          </div>
          <div v-show="!pureSale">
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
                v-model="reservePrice"
              />
              <img
                src="@/assets/dollar-sign.svg"
                loading="eager"
                alt=""
                class="icon-inside-input-left"
              />
            </div>
          </div>
          <div v-show="buyItNow">
            <label for="buyNowPrice">Buy It Now Price</label>
            <div class="position-relative---z-index-1 flex-horizontal">
              <input
                type="number"
                class="input icon-inside-left w-input"
                maxlength="256"
                name="buyNowPrice"
                data-name="buyNowPrice"
                placeholder="Enter vehicle buy now price"
                id="buyNowPrice"
                v-model="buyNowPrice"
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
            <label for="saleDate">Sale Date:</label>
            <input type="datetime-local" id="saleDate" v-model="saleDate" class="input icon-inside-left w-input" />
          </div>
        </div>
        <div>
          <div
            class="description-container"
            style="max-width: 100%; height: 50px; margin-top: 30px"
          >
            <label for="description">Description:</label>
            <textarea
              id="description"
              v-model="description"
              style="resize: none; width: 100%; height: 60px"
            ></textarea>
          </div>
        </div>
        <div
          style="
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 35px;
            margin-bottom: 30px;
          "
        >
          <div
            style="
              display: flex;
              align-items: center;
              margin-right: 10px;
              margin-top: 5px;
            "
          >
            <input
              type="checkbox"
              id="vehicleRuns"
              :name="vehicleRuns"
              class="checkbox-input"
              v-model="vehicleRuns"
              style="width: 24px; height: 24px; margin-right: 8px"
            />
            <label :for="vehicleRuns" class="checkbox-label">
              Vehicle Runs
            </label>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              margin-right: 10px;
              margin-top: 5px;
            "
          >
            <div></div>
            <input
              type="checkbox"
              id="vehicleDrives"
              :name="vehicleDrives"
              class="checkbox-input"
              v-model="vehicleDrives"
              style="width: 24px; height: 24px; margin-right: 8px"
            />
            <label :for="vehicleDrives" class="checkbox-label"
              >Vehicle Drives</label
            >
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              margin-right: 10px;
              margin-top: 5px;
            "
          >
            <input
              type="checkbox"
              id="pureSale"
              :name="pureSale"
              class="checkbox-input"
              v-model="pureSale"
              style="width: 24px; height: 24px; margin-right: 8px"
            />
            <label :for="pureSale" class="checkbox-label">Pure Sale</label>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              margin-right: 10px;
              margin-top: 5px;
            "
          >
            <input
              type="checkbox"
              id="buyItNow"
              :name="buyItNow"
              class="checkbox-input"
              v-model="buyItNow"
              style="width: 24px; height: 24px; margin-right: 8px"
            />
            <label :for="buyItNow" class="checkbox-label">Buy it Now</label>
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
        <div style="margin-top: 24px">
          <h3>Damage Fields</h3>
          <p>Select all panels that have damage.</p>
          <div class="damage-fields-container">
            <div
              v-for="(field, index) in damageFields"
              :key="index"
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
  </form>
</template>
<script>
import api from "../../axios";
import store from "../store";

export default {
  name: "AddVehicle",
  data() {
    return {
      pureSale: false,
      buyItNow: false,
      buyNowPrice: 0,
      reservePrice: 0,
      submitted: false,
      titleNote: "",
      vehicleState: "",
      odometerBranding: "",
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
      vehicleZip: "",
      numKeys: "",
      saleDate: "",
      description: "",
      vehicleRuns: false,
      vehicleDrives: false,
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
      states: [
        { label: "Alabama", value: "AL" },
        { label: "Alaska", value: "AK" },
        { label: "Arizona", value: "AZ" },
        { label: "Arkansas", value: "AR" },
        { label: "California", value: "CA" },
        { label: "Colorado", value: "CO" },
        { label: "Connecticut", value: "CT" },
        { label: "Delaware", value: "DE" },
        { label: "Florida", value: "FL" },
        { label: "Georgia", value: "GA" },
        { label: "Hawaii", value: "HI" },
        { label: "Idaho", value: "ID" },
        { label: "Illinois", value: "IL" },
        { label: "Indiana", value: "IN" },
        { label: "Iowa", value: "IA" },
        { label: "Kansas", value: "KS" },
        { label: "Kentucky", value: "KY" },
        { label: "Louisiana", value: "LA" },
        { label: "Maine", value: "ME" },
        { label: "Maryland", value: "MD" },
        { label: "Massachusetts", value: "MA" },
        { label: "Michigan", value: "MI" },
        { label: "Minnesota", value: "MN" },
        { label: "Mississippi", value: "MS" },
        { label: "Missouri", value: "MO" },
        { label: "Montana", value: "MT" },
        { label: "Nebraska", value: "NE" },
        { label: "Nevada", value: "NV" },
        { label: "New Hampshire", value: "NH" },
        { label: "New Jersey", value: "NJ" },
        { label: "New Mexico", value: "NM" },
        { label: "New York", value: "NY" },
        { label: "North Carolina", value: "NC" },
        { label: "North Dakota", value: "ND" },
        { label: "Ohio", value: "OH" },
        { label: "Oklahoma", value: "OK" },
        { label: "Oregon", value: "OR" },
        { label: "Pennsylvania", value: "PA" },
        { label: "Rhode Island", value: "RI" },
        { label: "South Carolina", value: "SC" },
        { label: "South Dakota", value: "SD" },
        { label: "Tennessee", value: "TN" },
        { label: "Texas", value: "TX" },
        { label: "Utah", value: "UT" },
        { label: "Vermont", value: "VT" },
        { label: "Virginia", value: "VA" },
        { label: "Washington", value: "WA" },
        { label: "West Virginia", value: "WV" },
        { label: "Wisconsin", value: "WI" },
        { label: "Wyoming", value: "WY" },
      ],
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
      this.submitted = true;
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
      formData.append("odometerBranding", this.odometerBranding);
      formData.append("fuel", this.fuel);
      formData.append("transmission", this.transmission);
      formData.append("drive", this.drive);
      formData.append("cylinders", this.cylinders);
      formData.append("displacement", this.displacement);
      formData.append("engineType", this.engineType);
      formData.append("titleStatus", this.titleStatus);
      formData.append("titleNote", this.titleNote);
      formData.append("vehicleType", this.vehicleType);
      formData.append("vehicleZip", this.vehicleZip);
      formData.append("numKeys", this.numKeys);
      formData.append("userID", store.state.userID);
      formData.append("vehicleRuns", this.vehicleRuns);
      formData.append("vehicleDrives", this.vehicleDrives);
      formData.append("pureSale", this.pureSale);
      formData.append("buyItNow", this.buyItNow);
      formData.append("buyNowPrice", this.buyNowPrice);
      formData.append("reservePrice", this.reservePrice);
      formData.append("vehicleState", this.vehicleState.value);
      formData.append("saleDate", this.saleDate);
      formData.append("description", this.description);

      for (let i = 0; i < this.damageFields.length; i++) {
        formData.append(this.damageFields[i].name, this.damageFields[i].value);
      }
      if (
        !this.vin ||
        !this.make ||
        !this.model ||
        !this.year ||
        !this.color ||
        !this.odometer ||
        !this.fuel ||
        !this.transmission ||
        !this.drive ||
        !this.engineType ||
        !this.titleStatus ||
        !this.vehicleType ||
        !this.vehicleZip ||
        !this.numKeys ||
        !this.vehicleState ||
        !this.odometerBranding ||
        this.images.length < 1
      ) {
        const icon = require("@/assets/cross.svg");
        this.$root.showNotificationBar(
          "Vehicle Form Missing Fields",
          "red",
          3000,
          icon
        );
      } else {
        try {
          this.submitted = false;
          const response = await api.post("/list-vehicle/", formData, {
            headers: {
              "X-CSRFToken": store.getters.csrfToken,
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          });
          console.log(response.data);
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
            this.vehicleZip = "";
            this.vehicleType = "";
            this.buyNowPrice = "";
            this.vehicleState = "";
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
              "red",
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
.damage-fields-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  padding-top: 16px;
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
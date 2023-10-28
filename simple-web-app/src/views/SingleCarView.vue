<template>
  <div v-if="this.car" id="cards" class="pd-top-24px">
    <h2 class="text-500 bold mg-bottom-12px">{{ car.year  }} {{ car.make }} {{ car.model }}</h2>
    <div id="text-cards" class="mg-bottom-16px">
      <div class="card component-card">
        <div class="grid-2-columns">
          <div class="inner-container _384px _100-tablet">
            <image-viewer v-if="car.images" :images="car.images"></image-viewer>
            <bid-card :startingBid="car.starting_bid"></bid-card>
            <available-parts :parts="car.parts"></available-parts>
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
                    <div class="text-100 medium">{{ car.title_code }}</div>
                  </div>
                  <div class="data-table-row">
                    <div class="text-100 bold color-neutral-800">Odometer</div>
                    <div class="text-100 medium">{{ car.mileage }}</div>
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
                </div>
              </div>
            </div>
            <vehicle-reports :reports="car.reports"></vehicle-reports>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageViewer from "../components/ImageViewer.vue";
import BidCard from "../components/BidCard.vue";
import AvailableParts from "../components/SaleInfo.vue";
import VehicleReports from "../components/VehicleReports.vue";
import api from "../../axios";

export default {
  components: { ImageViewer, BidCard, AvailableParts, VehicleReports },
  data() {
    return {
      car: null,
    };
  },
  mounted() {
    this.fetchCar()
  },
  methods: {
    fetchCar() {
      const carId = this.$route.params.id;
      api
        .get(`single-car/?id=${carId}`)
        .then((response) => {
          this.car = response.data.car;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    
  },
};
</script>



<style scoped>
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
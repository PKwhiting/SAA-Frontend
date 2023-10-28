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
                    <a :href="getCarUrl(car.id)">{{ car.lot_location }}</a>
                  </div>
                  <div>
                    <a :href="getCarUrl(car.id)"
                      >{{ car.make }} {{ car.model }} {{ car.year }}</a
                    >
                  </div>
                  <div class="hide-mobile">
                    <a :href="getCarUrl(car.id)">{{ car.price }}</a>
                  </div>
                  <div class="hide-tablet">
                    <a :href="getCarUrl(car.id)">{{ car.bids }}</a>
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

export default {
  name: "VehicleList",
  data() {
    return {
      cars: [],
    };
  },
  mounted() {
    this.fetchCars();
  },
  methods: {
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
}
.table-header.data-table-row {
  padding:12px;
  text-align: center;
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
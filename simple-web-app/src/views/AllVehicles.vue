<template>
  <div class="vehicle-list">
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Lot Location</th>
          <th>Vehicle Info</th>
          <th class="hide-mobile">Condition</th>
          <th class="hide-mobile">Sale Info</th>
          <th class="hide-tablet">Bids</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="car in cars" :key="car.id">
              <td><a :href="getCarUrl(car.id)"><img :src="car.images[0]" alt="Vehicle thumbnail" /></a></td>
              <td><a :href="getCarUrl(car.id)">{{ car.lot_location }}</a></td>
              <td><a :href="getCarUrl(car.id)">{{ car.make }} {{ car.model }} {{ car.year }}</a></td>
              <td class="hide-mobile"><a :href="getCarUrl(car.id)">{{ car.condition }}</a></td>
              <td class="hide-mobile"><a :href="getCarUrl(car.id)">{{ car.price }}</a></td>
              <td class="hide-tablet"><a :href="getCarUrl(car.id)">{{ car.bids }}</a></td>
          </tr>
      </tbody>
    </table>
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
}

/* Hide columns on tablet */
@media (max-width: 991px) {
  .hide-tablet {
    display: none;
  }
}
</style>
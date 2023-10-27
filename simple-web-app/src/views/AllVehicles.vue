<template>
  <div class="vehicle-list">
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Lot Location</th>
          <th>Vehicle Info</th>
          <th>Condition</th>
          <th>Sale Info</th>
          <th>Bids</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="car in cars" :key="car.id">
          <td><img :src="car.image_url" alt="Vehicle thumbnail" /></td>
          <td>{{ car.lot_location }}</td>
          <td>{{ car.make }} {{ car.model }} {{ car.year }}</td>
          <td>{{ car.condition }}</td>
          <td>{{ car.price }}</td>
          <td>{{ car.bids }}</td>
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
</style>
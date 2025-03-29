<template>
  <div>
    <h2>Available Flights</h2>
    <FlightFilters @applyFilters="fetchFlights" />
    <table>
      <thead>
      <tr>
        <th>Destination</th>
        <th>Date</th>
        <th>Duration</th>
        <th>Price</th>
        <th>Seats Available</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="flight in flights" :key="flight.id">
        <td>{{ flight.destination }}</td>
        <td>{{ new Date(flight.date).toLocaleString() }}</td>
        <td>{{ flight.duration }} hrs</td>
        <td>${{ flight.price }}</td>
        <td>{{ flight.seatsAvailable }}</td>
        <td>
          <router-link :to="'/booking/' + flight.id">
            <button :disabled="flight.seatsAvailable === 0">Book Now</button>
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import FlightFilters from './FlightFilters.vue';

export default {
  components: { FlightFilters },
  data() {
    return {
      flights: [],
    };
  },
  methods: {
    fetchFlights(filters = {}) {
      axios.get('http://localhost:8080/flights/search', { params: filters })
          .then(response => {
            this.flights = response.data;
          })
          .catch(error => console.error(error));
    }
  },
  created() {
    this.fetchFlights();
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>

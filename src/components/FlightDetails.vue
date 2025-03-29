<template>
  <div v-if="flight">
    <h2>Flight Details</h2>
    <p><strong>Destination:</strong> {{ flight.destination }}</p>
    <p><strong>Date:</strong> {{ new Date(flight.date).toLocaleString() }}</p>
    <p><strong>Duration:</strong> {{ flight.duration }} hrs</p>
    <p><strong>Price:</strong> ${{ flight.price }}</p>
    <p><strong>Seats Available:</strong> {{ flight.seatsAvailable }}</p>
    <router-link :to="'/booking/' + flight.id">
      <button :disabled="flight.seatsAvailable === 0">Book Now</button>
    </router-link>
  </div>
  <p v-else>Loading flight details...</p>
</template>

<script>
import axios from 'axios';

export default {
  props: ['flightId'],
  data() {
    return {
      flight: null
    };
  },
  created() {
    axios.get(`http://localhost:8080/flights/${this.flightId}`)
        .then(response => {
          this.flight = response.data;
        })
        .catch(error => console.error(error));
  }
};
</script>

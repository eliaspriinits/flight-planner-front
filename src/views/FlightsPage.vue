<template>
  <div>
    <h2>Flights</h2>
    <FlightFilters @applyFilters="fetchFlights" />
    <FlightList :flights="flights" />
  </div>
</template>

<script>
import FlightFilters from '../components/FlightFilters.vue';
import FlightList from '../components/FlightList.vue';
import axios from 'axios';

export default {
  components: { FlightFilters, FlightList },
  data() {
    return {
      flights: []
    };
  },
  methods: {
    fetchFlights(filters = {}) {
      axios.get('http://localhost:8080/flight/search', { params: filters })
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

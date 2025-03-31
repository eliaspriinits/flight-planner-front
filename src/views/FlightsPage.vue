<template>
  <div>
    <FlightList :flights="flights" />
  </div>
</template>

<script>
import FlightList from '../components/FlightList.vue';
import axios from 'axios';

export default {
  components: { FlightList },
  data() {
    return {
      flights: [],
    };
  },
  methods: {
    searchFlights(filters = {}) {
      axios.get('http://localhost:8080/flight/search', { params: filters })
          .then(response => {
            this.flights = response.data;
          })
          .catch(error => console.error(error));
    },
    fetchFlights() {
      axios.get('http://localhost:8080/flight/fetch')
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

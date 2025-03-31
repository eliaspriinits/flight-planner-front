<template>
  <div>
    <h1>Welcome to Flight Booking</h1>
    <form @submit.prevent="generateFlights">
      <button type="submit">Generate Flights</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    async generateFlights() {
      try {
        await axios.post('http://localhost:8080/flight/generate');
        this.$router.push('/flights');
      } catch (error) {
        console.error('Error generating flights:', error);
      }
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}
</style>
<template>
  <div>
    <h2>Select a Seat</h2>
    <div class="seat-grid">
      <button
          v-for="seat in seats"
          :key="seat.seatNumber"
          :class="{ booked: seat.status === 'BOOKED' }"
          @click="selectSeat(seat)"
          :disabled="seat.status === 'BOOKED'"
      >
        {{ seat.seatNumber }}
      </button>
    </div>
    <button @click="confirmBooking" v-if="selectedSeat">Confirm Booking</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['flightId'],
  data() {
    return {
      seats: [],
      selectedSeat: null
    };
  },
  methods: {
    fetchSeats() {
      axios.get(`http://localhost:8080/flights/${this.flightId}/seats`)
          .then(response => {
            this.seats = response.data;
          })
          .catch(error => console.error(error));
    },
    selectSeat(seat) {
      this.selectedSeat = seat;
    },
    confirmBooking() {
      axios.post(`http://localhost:8080/flights/${this.flightId}/book`, { seatNumber: this.selectedSeat.seatNumber })
          .then(() => alert("Booking Confirmed!"))
          .catch(error => console.error(error));
    }
  },
  created() {
    this.fetchSeats();
  }
};
</script>

<style scoped>
.seat-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}
button {
  padding: 10px;
}
.booked {
  background-color: red;
  color: white;
}
</style>

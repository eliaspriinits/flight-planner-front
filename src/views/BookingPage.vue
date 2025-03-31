<template>
  <div>
    <h3>Select Your Seat</h3>

    <div>
      <button @click="bookSeats">Book Selected Seats</button>
    </div>

    <div>
      <label for="ticketCounter">Select number of tickets: </label>
      <input
          type="number"
          v-model="ticketCount"
          :max="availableSeats.length"
          min="1"
          step="1"
          id="ticketCounter"
      />
    </div>

    <div>
      <label>
        <input type="checkbox" v-model="filters.window" />
        Window Seats (A and F)
      </label>
      <label>
        <input type="checkbox" v-model="filters.legSpace" />
        More Leg Space
      </label>
      <label>
        <input type="checkbox" v-model="filters.exit" />
        Near Exit
      </label>
    </div>

    <div v-if="seats.length" class="seat-grid">
      <div
          v-for="seat in seats"
          :key="seat.name"
          :class="{
          booked: seat.booked,
          available: !seat.booked && !seat.filteredOut,
          selected: seat.selected,
          filteredOut: seat.filteredOut
        }"
          @click="selectSeat(seat)"
      >
        {{ seat.name }}
      </div>
    </div>
    <p v-else>Loading seats...</p>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  props: ['flightId'],
  data() {
    return {
      seats: [],
      ticketCount: 1,
      selectedSeats: [],
      filters: {
        window: false,
        legSpace: false,
        exit: false
      }
    };
  },
  computed: {
    currentFlightId() {
      return this.flightId || this.$route.params.flightId;
    },
    availableSeats() {
      return this.seats.filter(seat => !seat.booked && !seat.selected);
    }
  },
  created() {
    this.fetchSeats();
  },
  methods: {
    async fetchSeats() {
      if (!this.currentFlightId) {
        console.error('No flightId provided');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/flight/${this.currentFlightId}/seats`);
        this.seats = response.data.map(seat => ({
          name: seat,
          booked: seat.includes('*'),
          selected: false,
          filteredOut: false
        }));
        this.applyFilters();
      } catch (error) {
        console.error('Error fetching seats:', error);
      }
    },

    applyFilters() {
      this.seats.forEach(seat => {
        const isWindowSeat = seat.name.includes('A') || seat.name.includes('F');
        const hasLegSpace = seat.name === '1A' || seat.name === '1B' || seat.name === '1C' || seat.name === '1D' || seat.name === '1E' || seat.name === '1F' || seat.name.includes('13');
        const nearExit = seat.name === '1A' || seat.name === '1B' || seat.name === '1C' || seat.name === '1D' || seat.name === '1E' || seat.name === '1F' || seat.name.includes('12') || seat.name.includes('13') || seat.name.includes('25');

        seat.filteredOut =
            (this.filters.window && !isWindowSeat) ||
            (this.filters.legSpace && !hasLegSpace) ||
            (this.filters.exit && !nearExit);
      });
    },

    selectSeat(seat) {
      if (seat.booked) {
        return;
      }

      if (!seat.filteredOut) {
        if (this.selectedSeats.length < this.ticketCount) {
          seat.selected = !seat.selected;
          if (seat.selected) {
            this.selectedSeats.push(seat.name);
          } else {
            const index = this.selectedSeats.indexOf(seat.name);
            if (index > -1) this.selectedSeats.splice(index, 1);
          }
        }
      }
    },

    deselectSeats() {
      this.seats.forEach(seat => {
        seat.selected = false;
      });
      this.selectedSeats = [];
    },

    async bookSeats() {
      if (this.selectedSeats.length === 0) {
        alert("Please select seats first.");
        return;
      }

      try {
        const response = await axios.put(
            `http://localhost:8080/flight/${this.currentFlightId}/booking`,
            this.selectedSeats,
            {
              headers: { "Content-Type": "application/json" }
            }
        );

        console.log("Seats booked successfully:", response.data);
        alert("Seats booked successfully!");

        this.selectedSeats = [];
        this.fetchSeats();

      } catch (error) {
        console.error('Error booking seats:', error);
        alert("Error booking seats.");
      }
    }

  },

  watch: {
    filters: {
      handler() {
        this.applyFilters();
      },
      deep: true,
      immediate: true,
    },

    ticketCount(newTicketCount) {
      if (newTicketCount < this.selectedSeats.length) {
        this.deselectSeats();
      }
    }
  },
};
</script>
<style scoped>
.seat-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin-top: 10px;
  max-width: 30%;
}

.seat-grid div {
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}

.booked {
  background-color: red;
  color: white;
}

.available {
  background-color: green;
  color: white;
}

.selected {
  background-color: blue;
  color: white;
}

.filteredOut {
  background-color: grey;
  color: white;
  opacity: 0.5;
}

input[type="number"] {
  padding: 5px;
  width: 60px;
  margin-top: 5px;
}
</style>

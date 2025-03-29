<template>
  <div>
    <h2>Book Flight</h2>
    <FlightDetails :flightId="flightId" />
    <SeatSelection :flightId="flightId" />
  </div>
</template>

<script>
import FlightDetails from '../components/FlightDetails.vue';
import SeatSelection from '../components/SeatSelection.vue';

export default {
  components: { FlightDetails, SeatSelection },
  props: ['id'],
  computed: {
    flightId() {
      return this.id;
    }
  }
};
</script>

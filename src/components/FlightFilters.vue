<template>
  <div>
    <label>Destination: <input v-model="filters.destination" /></label>
    <label>Date: <input type="date" v-model="filters.date" /></label>
    <label>Max Price: <input type="number" v-model="filters.maxPrice" /></label>
    <label>Min Duration: <input type="number" v-model="filters.minDuration" /></label>
    <button @click="applyFilters">Apply Filters</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        destination: '',
        date: '',
        maxPrice: '',
        minDuration: ''
      }
    };
  },
  methods: {
    applyFilters() {
      this.$emit('applyFilters', this.filters);
    }
  }
};
</script>

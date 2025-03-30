<template>
  <div>
    <label>Origin: <input v-model="filters.origin" /></label>
    <span v-if="error" style="color: red;">{{ error }}</span>

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
        origin: '',
        destination: '',
        date: '',
        maxPrice: '',
        minDuration: ''
      },
      error: ''
    };
  },
  methods: {
    applyFilters() {
      if (!this.filters.origin.trim()) {
        this.error = "Origin is required!";
        return;
      }
      this.error = '';
      this.$emit('applyFilters', this.filters);
    }
  }
};
</script>


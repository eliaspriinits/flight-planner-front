<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/flights">Flights</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
nav {
  padding: 10px;
  background: #333;
  color: white;
}
nav a {
  color: white;
  margin-right: 10px;
  text-decoration: none;
}
</style>


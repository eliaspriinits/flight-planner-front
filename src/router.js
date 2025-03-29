import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomePage.vue';
import Flights from './views/FlightsPage.vue';
import Booking from './views/BookingPage.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/flights', component: Flights },
    { path: '/booking/:id', component: Booking, props: true }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

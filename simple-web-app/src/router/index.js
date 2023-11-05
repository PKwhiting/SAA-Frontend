
import { createRouter, createWebHistory } from 'vue-router';
import SingleCarView from '@/views/SingleCarView.vue'
import Login from '@/views/Login.vue'
import AllVehicles from '@/views/AllVehicles.vue'
import AboutUs from '@/views/AboutUs.vue'
import SoldVehicles from '@/views/SoldVehicles.vue'
import AddVehicle from '@/views/AddVehicle.vue'
import store from '@/store'

const requireAuth = (to, from, next) => {
  if (store.state.isLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
};

const routes = [
  {
    path: '/',
    component: AllVehicles,
    name: 'home',
  },
  {
    path: '/single-car-view/:id',
    component: SingleCarView,
    name: 'login',
  },
  {
    path: '/about-us',
    component: AboutUs,
    name: 'about-us',
  },
  {
    path: '/sold',
    component: SoldVehicles,
    name: 'sold',
  },
  {
    path: '/add-vehicle',
    component: AddVehicle,
    name: 'add-vehicle',
    beforeEnter: requireAuth
  },

];
    

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.getters.isLoggedIn) {
//       next({
//         name: 'login',
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })
    
export default router
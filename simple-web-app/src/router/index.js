
import { createRouter, createWebHistory } from 'vue-router';
import SingleCarView from '@/views/SingleCarView.vue'
import Login from '@/views/Login.vue'
import AllVehicles from '@/views/AllVehicles.vue'
import AboutUs from '@/views/AboutUs.vue'
import SoldVehicles from '@/views/SoldVehicles.vue'

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
  }
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
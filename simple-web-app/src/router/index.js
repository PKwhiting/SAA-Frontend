import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import SingleCarView from '@/views/SingleCarView.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/',
    component: SingleCarView,
    name: 'home',
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
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
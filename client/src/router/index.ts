import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// @ts-ignore
import Cookies from 'js-cookie'

// Landing
// import HomeView from '../views/HomeView.vue'
import MainPage from '../views/MainPage.vue'
import HomeView from '../views/HomeView.vue'
import CheckView from '../views/CheckView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  },
  {
    path: '/signatures',
    name: 'signatures',
    component: HomeView,
    beforeEnter: (to, from, next) =>  {
      if (!Cookies.get('userName')) {
        window.location.href = '/'
      } else {
        next();
      }
    },
  },
  {
    path: '/checkSignatures',
    name: 'checkSignatures',
    component: CheckView,
    beforeEnter: (to, from, next) =>  {
      if (!Cookies.get('userName')) {
        window.location.href = '/'
      } else {
        next();
      }
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

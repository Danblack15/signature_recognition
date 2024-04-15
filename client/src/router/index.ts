import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Landing
// import HomeView from '../views/HomeView.vue'
import MainPage from '../views/MainPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

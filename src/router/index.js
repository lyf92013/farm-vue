import Vue from 'vue'
import VueRouter from 'vue-router'
import Entry from '../views/Entry.vue'
import Ship from '../views/Ship.vue'
import Repair from '../views/Repair.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/root',
    name: 'Entry',
    component: Entry
  },
  {
    path: '/ship',
    name: 'Ship',
    component: Ship
  },
  {
    path: '/repair',
    name: 'Repair',
    component: Repair,
  }
]

const router = new VueRouter({
  routes
})

export default router

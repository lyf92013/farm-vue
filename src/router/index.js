import Vue from 'vue'
import VueRouter from 'vue-router'
import Entry from '../views/Entry.vue'
import Produce from '../views/Produce.vue'
import Repair from '../views/Repair.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/root',
    name: 'Entry',
    component: Entry
  },
  {
    path: '/produce',
    name: 'Produce',
    component: Produce
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

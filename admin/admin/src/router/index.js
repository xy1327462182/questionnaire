import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/home'
import User from '../pages/user'
import Docs from '../pages/docs'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/docs',
    name: 'Docs',
    component: Docs
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

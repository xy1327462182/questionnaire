import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import Docs from '../pages/Docs.vue'
import Edit from '../pages/Edit.vue'
import Share from '../pages/Share.vue'
import Detail from '../pages/Detail.vue'
import Result from '../pages/Result.vue'
import User from '../pages/User.vue'
import List from '../pages/List.vue'
import Data from '../pages/Data.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/docs',
    name: 'Docs',
    component: Docs
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/share',
    name: 'Share',
    component: Share
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/result',
    name: 'Result',
    component: Result
  },
  {
    path: '/data',
    name: 'Data',
    component: Data
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/list',
    name: 'List',
    component: List
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

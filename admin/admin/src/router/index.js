import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/home'
import User from '../pages/user'
import UserAdd from '../pages/user/edit.vue'
import Question from '../pages/question'
import Docs from '../pages/docs'
import Login from '../pages/login'

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
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/user/add',
    name: 'UserAdd',
    component: UserAdd
  },
  {
    path: '/docs',
    name: 'Docs',
    component: Docs
  },
  {
    path: '/question',
    name: 'Question',
    component: Question
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

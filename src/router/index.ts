import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'

const ifNotAuthenticated = (to: any, from: any, next: any) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to: any, from: any, next: any) => {
  if (store.getters.isAuthenticated) {
    // if user is authenticated then proceed
    next()
    return
  }
  // ...else redirect the user to the login screen
  next('/login')
}

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    // catch all 404 - define at the very end
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router

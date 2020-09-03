import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import SignUp from '@/views/SignUp.vue'
import ConfirmCode from '@/views/ConfirmCode.vue'
import ReferralForm from '@/views/ReferralForm.vue'
import NotFound from '@/views/NotFound.vue'
import store from '../store'

const ifAuthenticated = (to: any, from: any, next: any) => {
  if (store.getters['Auth/isAuthenticated']) {
    // if user is authenticated then proceed
    next()
    return
  }
  // ...else redirect the user to the login screen
  next('/login')
}

const ifNewUser = (to: any, from: any, next: any) => {
  if (store.getters['Accounts/isNewUser']) {
    // if this is a new user then proceed
    next()
    return
  }
  // ...else redirect the user home
  next('/')
}

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/confirmCode',
    name: 'ConfirmCode',
    component: ConfirmCode,
    beforeEnter: ifNewUser
  },
  {
    path: '/referralForm',
    name: 'ReferralForm',
    component: ReferralForm,
    beforeEnter: ifAuthenticated
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

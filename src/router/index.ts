import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import SignUp from '@/views/SignUp.vue'
import ConfirmCode from '@/views/ConfirmCode.vue'
import ReferralForm from '@/views/ReferralForm.vue'
import Checklist from '@/views/Checklist.vue'
import NotFound from '@/views/NotFound.vue'
import store from '../store'
import i18n from '../i18n'

const ifAuthenticated = (to: any, from: any, next: any) => {
  if (store.getters['Auth/isAuthenticated']) {
    // if user is authenticated then proceed
    next()
    return
  }
  // ...else redirect the user to the login screen
  next('/')
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
    redirect: `/${i18n.locale}`
  },
  {
    path: '/:lang',
    // create a container component
    component: {
      render (c) { return c('router-view') }
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: 'signUp',
        name: 'SignUp',
        component: SignUp
      },
      {
        path: 'confirmCode',
        name: 'ConfirmCode',
        component: ConfirmCode,
        beforeEnter: ifNewUser
      },
      {
        path: 'referralForm',
        name: 'ReferralForm',
        component: ReferralForm,
        beforeEnter: ifAuthenticated
      },
      {
        path: 'checklist',
        name: 'Checklist',
        component: Checklist,
        beforeEnter: ifAuthenticated
      },
      {
        // catch all 404 - define at the very end
        path: '*',
        component: NotFound
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

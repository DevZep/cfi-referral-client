import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './aws' // setup and configure AWS Amplify
import { initSentry } from './libs/errorLib' // setup error monitoring
import Loading from '@/components/Loading.vue'

initSentry()

Vue.component('Loading', Loading)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

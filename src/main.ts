import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './aws' // setup and configure AWS Amplify
import Loading from '@/components/Loading.vue'
import CenterContainer from '@/components/CenterContainer.vue'

Vue.component('Loading', Loading)
Vue.component('CenterContainer', CenterContainer)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

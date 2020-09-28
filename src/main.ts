import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './aws' // setup and configure AWS Amplify
import { initSentry } from './libs/errorLib' // setup error monitoring
import Loading from '@/components/Loading.vue'
import i18n from './i18n'
import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

initSentry()

Vue.use(VuejsDialog)
Vue.component('Loading', Loading)
Vue.config.productionTip = false

// router guard for multilang support
router.beforeEach((to, from, next) => {
  let language = to.params.lang

  // default to en if lang param not set
  if (!language) {
    language = 'en'
  }

  i18n.locale = language

  next()
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')

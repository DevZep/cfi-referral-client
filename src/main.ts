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
import ImageUploader from 'vue-image-upload-resize'

initSentry()

Vue.use(VuejsDialog)
Vue.use(ImageUploader)
Vue.component('Loading', Loading)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')

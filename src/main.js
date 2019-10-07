import Vue from 'vue'
import Notifications from 'vue-notification'

import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import './style.scss'

Vue.use(Notifications)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

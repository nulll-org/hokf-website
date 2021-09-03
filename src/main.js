import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'
import money from 'v-money';


import { Icon } from '@iconify/vue2'

import "animate.css"

Vue.config.productionTip = false
Vue.component('icon', Icon)

const moneyConfig = {
  decimal: '.',
  thousands: ',',
  precision: 2,
  prefix: '₦',
}
Vue.use(money, moneyConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'
import { ReactiveFormConfig, ClientLibrary } from '@rxweb/reactive-forms';
import money from 'v-money';
import "vue-toastification/dist/index.css";

import Input from './components/input/index.vue';
import Toast from "vue-toastification";
import { Icon } from '@iconify/vue2'

import "animate.css"

ReactiveFormConfig.clientLib = ClientLibrary.Vue;

ReactiveFormConfig.set({
  validationMessage: {
    required: "This field is required",
    email: "A valid email is required"
  }
});

const toastOptions = {
  position: 'top-center',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  maxToasts: 5,
  newestOnTop: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
}

Vue.config.productionTip = false
Vue.component('icon', Icon)
Vue.component('Input', Input)

const moneyConfig = {
  decimal: '.',
  thousands: ',',
  precision: 2,
  prefix: '₦',
}

Vue.use(money, moneyConfig);
Vue.use(Toast, toastOptions)

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
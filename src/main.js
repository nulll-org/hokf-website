import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'

import AOS from 'aos'
import money from 'v-money';
import { Icon } from '@iconify/vue2';
import Toast from "vue-toastification";
import { ReactiveFormConfig, ClientLibrary } from '@rxweb/reactive-forms';

import Input from './components/input/index.vue';
import Dropdown from './components/dropdown/index.vue';

import "animate.css"
import 'aos/dist/aos.css'
import "vue-toastification/dist/index.css";

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
  maxToasts: 3,
  newestOnTop: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
}
const moneyConfig = {
  decimal: '.',
  thousands: ',',
  precision: 2,
  prefix: '₦',
}

Vue.config.productionTip = false

AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});


Vue.component('icon', Icon)
Vue.component('Input', Input)
Vue.component('Dropdown', Dropdown)

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
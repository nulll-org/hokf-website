import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import bookings from './modules/bookings'
import tournaments from './modules/tournaments'
import onlineStore from './modules/online-store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    bookings,
    tournaments,
    onlineStore
  }
})

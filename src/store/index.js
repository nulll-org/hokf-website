import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import bookings from './modules/reservation'
import loading from './modules/loading'
import onlineStore from './modules/online-store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    bookings,
    loading,
    onlineStore
  }
})

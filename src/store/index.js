import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import queries from './modules/queries'
import loading from './modules/loading'
import bookings from './modules/bookings'
import onlineStore from './modules/online-store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    bookings,
    loading,
    onlineStore,
    queries
  }
})

import * as firebase from '../../firebase';
import * as reponseConverterService from '../../services/response-converter.service'
import cart from './cart'

const state = {
  products: Array()
}

const getters = {
  products: state => state.products
}

const mutations = {
  setProducts: (state, products) => {
    state.products = []
    products.forEach(product => {
      state.products.push(reponseConverterService.convertToProduct(product))
    })
  }
}

const actions = {
  async fetchProducts({ commit }) {
    const products = await firebase.productCollection.get()
    commit('setProducts', products)
  },
}

const modules = {
  cart
}

export default {
  state,
  getters,
  mutations,
  actions,
  modules
}
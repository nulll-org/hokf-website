import { CartItem } from '../../classes/cartItem';
import * as firebase from '../../firebase';
import * as cartService from '../../services/cart.service'

const state = {
  cart: cartService.getCart()
}

const getters = {
  cart: state => state.cart
}

const mutations = {
  addToCart: (state, cartItem) => {
    console.log(cartItem)
    state.cart.push(cartItem)
    cartService.setCart(state.cart)
  },
  removeFromCart: (state, targetCartItemIndex) => {
    state.cart.splice(targetCartItemIndex, 1)
    cartService.setCart(state.cart)
  },
  clearCart: (state) => {
    state.cart = []
    cartService.setCart(state.cart)
  }
}

const actions = {
  addToCart({ commit }, product) {
    commit('addToCart', new CartItem(product))
  },
  removeFromCart({ commit }, cartItem) {
    let targetCartItemIndex = state.cart.findIndex((targetCartItem) => {
      return targetCartItem.product.productId === cartItem.product.productId
    })
    commit('removeFromCart', targetCartItemIndex)
  },
  clearCart({ commit }) {
    commit('clearCart')
  },
  updateQuantity() {

  },
  checkOut() {
    console.log(state.cart)
    firebase.orderCollection.doc().set(state.cart)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
import { CartItem } from '../../classes/cartItem';
// import * as firebase from '../../firebase';
import * as cartService from '../../services/cart.service'

const state = {
    cart: cartService.getCart()
}

const getters = {
    cart: state => state.cart
}

const mutations = {
    addToCart: (state, cartItem) => {
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
    removeFromCart({ commit }, product) {
        let targetCartItemIndex = state.cart.findIndex((targetCartItem) => {
            return targetCartItem.product.productId === product.productId
        })
        commit('removeFromCart', targetCartItemIndex)
    },
    clearCart({ commit }) {
        commit('clearCart')
    },
    updateQuantity() {

    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
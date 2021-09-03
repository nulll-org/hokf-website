import { CartService } from "../../services/cart.service"
import { Product } from '../../classes/product';
import * as firebase from '../../firebase';
import * as reponseConverterService from '../../services/response-converter.service'
import cart from './cart'

const state = {
    products: Array(),
    product: Product,
    cartService: new CartService()
}

// const getters = {
//     products: state => state.products
// }

const mutations = {
    setProducts: (state, products) => {
        state.products = []
        products.forEach(product => {
            state.products.push(reponseConverterService.convertToProduct(product))
        })
    },
    setProduct: (state, product) => {
        state.product = reponseConverterService.convertToProduct(product)
    },
}

const actions = {
    async fetchProducts({ commit }) {
        const products = await firebase.productCollection.get()
        commit('setProducts', products)
    },
    async fetchProduct({ commit }, productId) {
        const product = await firebase.productCollection.doc(productId).get()
        commit('setProduct', product)
    },
    async placeOrder(context, order) {
        await firebase.orderCollection.add(Object.assign({}, order));
    },
    // checkOut(context, order) {
    //     console.log(order)
    //     order.cartItems.forEach((cartItem) => {
    //         firebase.inventoryCollection.get().then((inventory) => {
    //             inventory.forEach((doc) => {
    //                 if(doc.data().product.id === cartItem.product.id) {
    //                     firebase.inventoryCollection.doc(doc.id).update
    //                 }
    //             })
    //         })
    //     })
    //     // firebase.orderCollection.doc().set(Object.assign({}, order))
    // }
}

const modules = {
    cart
}

export default {
    state,
    // getters,
    mutations,
    actions,
    modules
}
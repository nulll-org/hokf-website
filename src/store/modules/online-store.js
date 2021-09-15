import { CartService } from "../../services/cart.service"
import { Product } from '../../classes/product';
import * as firebase from '../../firebase';
import * as reponseConverterService from '../../services/response-converter.service'
import { searchProduct, getAllProducts, getAllOrders, getAllCartItems, getArchivedProducts, getRelatedCartIems } from "../api";

const state = {
    products: Array(),
    allProducts: Array(),
    archivedProducts: Array(),
    allOrders: Array(),
    allCartItems: Array(),
    product: Product,
    cartService: new CartService()
}

const mutations = {
    setProducts: (state, products) => {
        state.products = []
        products.forEach(product => {
            state.products.push(reponseConverterService.convertToProduct(product))
        })
    },
    setAllProducts: (state, products) => {
        state.allProducts = []
        state.currentLast = products.last
        products.products.forEach(product => {
            state.allProducts.push(reponseConverterService.convertToProduct(product))
        })
    },
    setArchivedProducts: (state, products) => {
        state.archivedProducts = []
        products.products.forEach(product => {
            state.archivedProducts.push(reponseConverterService.convertToProduct(product))
        })
    },
    // updateAllProducts: (state, products) => {
    //     state.currentLast = products.last
    //     products.products.forEach(product => {
    //         state.allProducts.push(reponseConverterService.convertToProduct(product))
    //     })
    // },
    setAllOrders: (state, orders) => {
        state.allOrders = []
        orders.forEach(order => {
            state.allOrders.push(reponseConverterService.convertToOrder(order))
        })
    },
    setAllCartItems: (state, cartItems) => {
        state.allCartItems = []
        cartItems.forEach(cartItem => {
            state.allCartItems.push(reponseConverterService.convertToCartItem(cartItem))
        })
    },
    setProduct: (state, product) => {
        if (product) 
            state.product = reponseConverterService.convertToProduct(product)
        else 
            state.product = product
    },
}

const actions = {
    async fetchProducts({ commit }) {
        const products = await firebase.productCollection.where("isInStock", "==", true).where("archived", "==", false).get()
        commit('setProducts', products);
    },
    async fetchAllProducts({ commit }) {
        const products = await getAllProducts()
        commit('setAllProducts', products);
    },
    async fetchArchivedProducts({ commit }) {
        const products = await getArchivedProducts()
        commit('setArchivedProducts', products);
    },
    // async fetchNextProducts({ commit }) {
    //     const products = await getNextProducts(state.currentLast)
    //     commit('updateAllProducts', products);
    // },
    async fetchAllOrders({ commit }) {
        const orders = await getAllOrders()
        commit('setAllOrders', orders);
    },
    async fetchAllCartItems({ commit }) {
        const cartItems = await getAllCartItems()
        commit('setAllCartItems', cartItems);
    },
    async fetchRelatedCartItems(context, id) {
        const _cartItems = []
        const cartItems = await getRelatedCartIems(id)
        cartItems.forEach(cartItem => {
            _cartItems.push(reponseConverterService.convertToCartItem(cartItem))
        })
        return _cartItems
    },
    async searchForProducts({ commit }, query) {
        const products = await (await searchProduct(query)).get()
        commit('setProducts', products);
    },
    async fetchProduct({ commit }, productId) {
        const product = await firebase.productCollection.doc(productId).get()
        commit('setProduct', product);
    },
    async emptyProduct({commit}) {
        commit('setProduct', null);
    }
}

export default {
    state,
    mutations,
    actions
}
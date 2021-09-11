import { CartService } from "../../services/cart.service"
import { Product } from '../../classes/product';
import * as firebase from '../../firebase';
import * as reponseConverterService from '../../services/response-converter.service'
import { searchProduct } from "../api";

const state = {
    products: Array(),
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
    setProduct: (state, product) => {
        if (product) 
            state.product = reponseConverterService.convertToProduct(product)
        else 
            state.product = product
    },
}

const actions = {
    async fetchProducts({ commit }) {
        const products = await firebase.productCollection.where("isInStock", "==", true).get()
        commit('setProducts', products);
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
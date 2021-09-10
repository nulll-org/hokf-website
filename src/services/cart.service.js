import { Cart } from "@/classes/cart";
import { CartItem } from "@/classes/cartItem";
import { Product } from "../classes/product";
import * as firebase from '../firebase';
import { errorNotification, notify } from "./notification.service";

export class CartService {
    cart = Cart.createEmpty();

    constructor() {
        this.loadCartFromLocalStorage();
    }

    get quantity() {
        let _quantity = 0
        if (this.cart.cartItems) {
            this.cart.cartItems.map((cartItem) => {
                _quantity += cartItem.quantity
            })
        }
        return _quantity
    }

    get totalCost() {
        let _cost = 0;
        if (this.cart.cartItems) {
            this.cart.cartItems.map((cartItem) => {
                _cost += cartItem.price
            })
        }
        return _cost;
    }

    updateProductQuantity(cartItem) {
        const exsitingCartItemIndex = this.cart.cartItems.findIndex((_cartItem) =>
            _cartItem.product.id === cartItem.product.id && _cartItem.size == cartItem.size)

        const updatedProduct = this.getProduct(cartItem.product.id);
        updatedProduct
        .then((_product) => {
            const product = {..._product.data(), id: _product.id};
            cartItem.product = new Product(product, product.id)
        })

        this.cart.cartItems.splice(exsitingCartItemIndex, 1, cartItem)

        this.saveCartToLocalStorage();
    }

    async addProductToCart(cartItem) {
        const _cartItem = new CartItem(cartItem);
        const _duplicateCartItem = this.cart.cartItems.find((cartItem) =>
            cartItem.product.id == _cartItem.product.id && cartItem.size == _cartItem.size)

        if (!_duplicateCartItem) {
            this.cart?.cartItems.push(_cartItem);
            this.saveCartToLocalStorage();
            notify(`${_cartItem.quantity}x [${(_cartItem.size).toUpperCase()}] ${_cartItem.product.name} has been added to your cart`)
            return true;
        } else {
            this.updateProductQuantity(_cartItem)
            notify(`${_cartItem.product.name} [${(_cartItem.size).toUpperCase()}] in your cart has been updated`)
            return false;
        }
    }

    async removeProductFromCart(cartItem) {
        const _cartItem = this.cart.cartItems.findIndex((_cartItem) =>
            _cartItem.product.id == cartItem.product.id && _cartItem.size == cartItem.size)

        if (_cartItem > -1) {
            notify(`${this.cart.cartItems[_cartItem].product.name} Size - ${(this.cart.cartItems[_cartItem].size).toUpperCase()} has been removed from your cart`);
            this.cart?.cartItems.splice(_cartItem, 1);
            this.saveCartToLocalStorage();
        } else {
            return 'Product not in cart'
        }

    }

    clearCart() {
        localStorage.removeItem('HOKF-cart')
    }

    async getProduct(productId) {
        const product = await firebase.productCollection.doc(productId).get();
        return product
    }
 
    async loadCartFromLocalStorage() {
        const localCart = localStorage.getItem('HOKF-cart');
        if (localCart) {
            const tempCart = new Cart(JSON.parse(localCart))
            const newCart = Cart.createEmpty()
            await tempCart.cartItems.forEach((cartItem) => {
                const updatedProduct = this.getProduct(cartItem.product.id);
                updatedProduct
                .then((_product) => {
                    const product = {..._product.data(), id: _product.id};
                    if (product.isInStock && product.quantityAvailable[cartItem.size] !== 0) {
                        if (cartItem.quantity > product.quantityAvailable[cartItem.size]) {
                            newCart.cartItems.push(new CartItem({product: product, size: cartItem.size, quantity: product.quantityAvailable[cartItem.size]}))
                        } else if (cartItem.quantity <= product.quantityAvailable[cartItem.size]) {
                            newCart.cartItems.push(new CartItem({product: product, size: cartItem.size, quantity: cartItem.quantity}))
                        }
                    } else {
                        errorNotification(`Your saved product '${cartItem.product.name}' is no longer available and has removed from your cart`)
                    }
                })
                .catch(() => {
                    errorNotification(`Your saved product '${cartItem.product.name}' is no longer available and has removed from your cart`)
                })
            })
            this.cart = newCart;
        }
    }

    saveCartToLocalStorage() {
        localStorage.setItem('HOKF-cart', JSON.stringify(this.cart));
    }
}
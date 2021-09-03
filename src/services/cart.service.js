import { Cart } from "@/classes/cart";
import { CartItem } from "@/classes/cartItem";
import * as firebase from '../firebase';

export class CartService {
    cart = Cart.createEmpty();

    constructor() {
        this.loadCartFromLocalStorage();
    }

    get quantity() {
        let _quantity = 0
        if (this.cartItems) {
            this.cartItems.map((cartItem) => {
                _quantity += cartItem.quantity
            })
        }
        return _quantity
    }

    updateProductQuantity(cartItem) {
        const exsitingCartItemIndex = this.cart.cartItems.findIndex((_cartItem) =>
            _cartItem.product.id === cartItem.product.id)

        this.cart.cartItems.splice(exsitingCartItemIndex, 1, cartItem)

        this.saveCartToLocalStorage();
    }

    async addProductToCart(cartItem) {
        const _cartItem = new CartItem(cartItem);
        const _duplicateCartItem = this.cart.cartItems.find((cartItem) =>
            cartItem.product.id == _cartItem.product.id)

        if (!_duplicateCartItem) {
            this.cart?.cartItems.push(_cartItem);
            this.saveCartToLocalStorage();
            return true;
        } else {
            return false;
        }

    }

    async removeProductFromCart(cartItem) {
        const _cartItem = this.cart.cartItems.findIndex((_cartItem) =>
            _cartItem.product.id == cartItem.product.id)

        if (_cartItem > -1) {
            this.cart?.cartItems.splice(_cartItem, 1);
            this.saveCartToLocalStorage();
            return cartItem.product.name;
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
 
    loadCartFromLocalStorage() {
        const localCart = localStorage.getItem('HOKF-cart');
        if (localCart) {
            const tempCart = new Cart(JSON.parse(localCart))
            const newCart = Cart.createEmpty()
            tempCart.cartItems.forEach((cartItem) => {
                const updatedProduct = this.getProduct(cartItem.product.id);
                updatedProduct
                    .then((_product) => {
                        if (_product.isInStock) {
                            if (cartItem.quantity > _product.quantityAvailable[cartItem.size]) {
                                newCart.cartItems.push(new CartItem({product: _product, size: cartItem.size, quantity: _product.quantityAvailable[cartItem.size]}))
                            } else if (cartItem.quantity <= _product.quantityAvailable[cartItem.size]) {
                                newCart.cartItems.push(new CartItem({product: _product, size: cartItem.size, quantity: cartItem.quantity}))
                            }
                        } else {
                            console.log(`Your saved product '${cartItem.product.name}' is no longer available and removed from your cart`)
                        }
                    })
                    .catch(() => {
                        console.log(`Your saved product '${cartItem.product.name}' is no longer available and removed from your cart`)
                    })
            })
            this.cart = newCart;
        }
    }

    saveCartToLocalStorage() {
        localStorage.setItem('HOKF-cart', JSON.stringify(this.cart));
    }
}
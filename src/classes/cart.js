import { CartItem } from "./cartItem";

export class Cart {
    constructor(cart) {
        this.cartItems = []
        if (cart.cartItems.length > 0)
            cart.cartItems.forEach((cartItem => {
                this.cartItems.push(new CartItem(cartItem))
            }))
    }

    get price() {
        let price = 0;
        this.cartItems.map((cartItem) => price += cartItem.price)
        return price
    }

    static createEmpty() {
        return new Cart({ cartItems: [] })
    }
}
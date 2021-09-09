import { Product } from "./product";

export class CartItem {
  constructor(cartItem) {
    this.product = new Product(cartItem.product, cartItem.product.id);
    this.size = cartItem.size;
    this.quantity = cartItem.quantity;
  }
  
  get price() {
    return this.product.discountedPrice * this.quantity;
  }
}
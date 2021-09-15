import { Product } from "./product";

export class CartItem {
  constructor(cartItem, id) {
    if (cartItem.orderId) {
      this.id = id;
      this.orderId = cartItem.orderId;
      this.product = null;
      cartItem.product.get().then((_product) => {
        this.product = new Product(_product.data(), cartItem.product.id);
      })
    } else {
      this.product = new Product(cartItem.product, cartItem.product.id);
    }
    this.size = cartItem.size;
    this.quantity = cartItem.quantity;
  }
  
  get price() {
    return this.product.discountedPrice * this.quantity;
  }
}
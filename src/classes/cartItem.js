import { Product } from "./product";

export class CartItem {
  product = Product;
  quantity = Number;

  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  get price() {
    return this.product.price - (this.product.price * (this.product.discountPercentage / 100))
  }
}
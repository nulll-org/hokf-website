import { Product } from "./product";

export class CartItem {
  product = Product;
  quantity = Number;
  price = Number;

  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
    this.price = (this.product.price - (this.product.price * (this.product.discountPercentage / 100)));
  }
}
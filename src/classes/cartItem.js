export class CartItem {
  constructor(cartItem) {
    this.product = cartItem.product;
    this.size = cartItem.size;
    this.quantity = cartItem.quantity;
  }
  
  get price() {
    return this.product.price - (this.product.price * (this.product.discountPercentage / 100));
  }
}
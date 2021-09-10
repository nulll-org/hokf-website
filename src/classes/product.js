export class Product {
  constructor(product, id) {
    this.id = id
    this.name = product.name;
    this.photo = product.photo || 'https://source.unsplash.com/featured/?shirt';
    this.type = product.type;
    this.description = product.description;
    this.price = product.price;
    this.isOnSale = product.isOnSale;
    this.isInStock = product.isInStock;
    this.quantityAvailable = product.quantityAvailable;
    this.quantitySold = product.quantitySold;
    this.discountPercentage = product.discountPercentage;
  }

  get discountedPrice() {
    return this.price - (this.price * this.discountPercentage / 100)
  }
}
export class Product {
  productId = String;
  name = String;
  photo = String;
  type = String;
  description = String;
  price = Number;
  isInStock = Boolean;
  isOnSale = Boolean;
  discountPercentage = Number;

  constructor(product, id) {
    this.productId = id
    this.name = product.name;
    this.photo = product.photo;
    this.type = product.type;
    this.description = product.description;
    this.price = product.price;
    this.isOnSale = product.isOnSale;
    this.isInStock = product.isInStock;
    this.discountPercentage = product.discountPercentage;
  }
}
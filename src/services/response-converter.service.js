import { Product } from "../classes/product";

const convertToProduct = (response) => { return new Product(response.data(), response.id) }

export {
  convertToProduct
}
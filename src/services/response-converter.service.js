import { Booking } from "../classes/booking";
import { CartItem } from "../classes/cartItem";
import { Order } from "../classes/order";
import { Product } from "../classes/product";
import { Query } from "../classes/query";

const convertToProduct = (response) => { return new Product(response.data(), response.id) }
const convertToOrder = (response) => { return new Order(response.data(), response.id) }
const convertToBooking = (response) => { return new Booking(response.data(), response.id) }
const convertToCartItem = (response) => { return new CartItem(response.data(), response.id) }
const convertToQuery = (response) => { return new Query(response.data(), response.id) }

export {
  convertToProduct,
  convertToOrder,
  convertToBooking,
  convertToCartItem,
  convertToQuery
}
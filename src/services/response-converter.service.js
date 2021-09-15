import { Booking } from "../classes/booking";
import { CartItem } from "../classes/cartItem";
import { Order } from "../classes/order";
import { Product } from "../classes/product";

const convertToProduct = (response) => { return new Product(response.data(), response.id) }
const convertToOrder = (response) => { return new Order(response.data(), response.id) }
const convertToBooking = (response) => { return new Booking(response.data(), response.id) }
const convertToCartItem = (response) => { return new CartItem(response.data()) }

export {
  convertToProduct,
  convertToOrder,
  convertToBooking,
  convertToCartItem
}
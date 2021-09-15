import * as firebase from '../../firebase';
import axios from 'axios'
import { httpService } from '../../services/http.service';
import { sendTemplateMailToAdmin } from '../../services/mail.service';

export async function getAllProducts() {
    const products = await firebase.productCollection.where("archived", "==", false).get();
    const last = products.docs[products.docs.length-1];
    return { products, last }
}

export async function getArchivedProducts() {
    const products = await firebase.productCollection.where("archived", "==", true).get();
    const last = products.docs[products.docs.length-1];
    return { products, last }
}

export async function newProduct(product) {
    const response = await firebase.productCollection.add(Object.assign({}, product))
    return response
}
export async function updateProduct(product, id) {
    const response = await firebase.productCollection.doc(id).update(Object.assign({}, product))
    return response
}

export async function getNextProducts(previous) {
    const products = await firebase.productCollection.startAfter(previous).limit(10).get();
    const last = products.docs[products.docs.length-1];
    return { products, last }
}

export async function setProductToArchived(productId) {
    const response = await firebase.productCollection.doc(productId).update({
        archived: true
    })
    return response
}

export async function setProductToUnarchived(productId) {
    const response = await firebase.productCollection.doc(productId).update({
        archived: false
    })
    return response
}

export async function searchProduct(query) {
    const products = await firebase.productCollection.where("name", "array-contains-any", query)
    return products
}

export async function getOrder(id) {
    const order = await firebase.orderCollection.doc(id)
    return (await order.get());
}

export async function getAllCartItems() {
    const cartItems = await firebase.cartItemCollection.get()
    return cartItems;
}

export async function getAllOrders() {
    const orders = await firebase.orderCollection.get()
    return orders;
}

export async function getAllBookings() {
    const bookings = await firebase.reservationCollection.get()
    return bookings;
}

export async function getRelatedCartIems(orderId) {
    const cartItems = await firebase.cartItemCollection.where("orderId", "==", orderId)
    return (await cartItems.get()).docs
}

export async function createOrder(order) {
    const response = await httpService.post('https://us-central1-house-of-kits-and-fits.cloudfunctions.net/checkOut', order)
    return response.data;
}

export async function newReservation(reservation) {
    const response = await firebase.reservationCollection.add(Object.assign({}, reservation));
    const _reservation = (await (await response.get()).data());
    const dateTime = new Date(`${_reservation.date}, ${_reservation.time}`)
    const date = dateTime.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
    const time = dateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const data = {..._reservation, date: date, time: time}
    sendTemplateMailToAdmin('newBooking', data)
    return response
}

export async function newQuery(query) {
    const response = await firebase.queryCollection.add(Object.assign({}, query));
    const _query = (await (await response.get()).data());
    const data = {..._query};
    sendTemplateMailToAdmin('newQuery', data)
    return response
}

export async function getNigerianStates() {
    const response = await axios.get('https://locationsng-api.herokuapp.com/api/v1/states')
    return response.data
}
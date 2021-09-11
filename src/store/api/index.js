import * as firebase from '../../firebase';
import axios from 'axios'
import { httpService } from '../../services/http.service';
import { sendMailToAdmin } from '../../services/mail.service';

export async function getAllProducts() {
    const products = await firebase.productCollection.get()
    return products
}

export async function getOrder(id) {
    const order = await firebase.orderCollection.doc(id)
    return (await order.get());
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
    console.log(reservation)
    const response = await firebase.reservationCollection.add(Object.assign({}, reservation));
    const _reservation = (await (await response.get()).data());
    const dateTime = new Date(`${_reservation.date}, ${_reservation.time}`)
    const date = dateTime.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
    const time = dateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const content = {
        message: `<p>${_reservation.name} has booked the ${_reservation.area} for ${_reservation.duration} on ${date} from ${time}`,
        subject: 'New Reservation'}
    sendMailToAdmin(content)
    return response
}

export async function newQuery(query) {
    console.log(query)
    const response = await firebase.queryCollection.add(Object.assign({}, query));
    const _query = (await (await response.get()).data());
    const content = {
        message: `<p>${_query.name} has made a new query</p> <h3>Message</h3> <p>${_query.message}</p>`,
        subject: 'New Query'}
    sendMailToAdmin(content)
    return response
}

export async function getNigerianStates() {
    const response = await axios.get('https://locationsng-api.herokuapp.com/api/v1/states')
    return response.data
}
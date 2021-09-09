import * as firebase from '../../firebase';
import axios from 'axios'
import { httpService } from '../../services/http.service';

export async function getAllProducts() {
    const products = await firebase.productCollection.get()
    return products
}

export async function createOrder(order) {
    const response = await httpService.post('https://us-central1-house-of-kits-and-fits.cloudfunctions.net/checkOut', order)
    return response
}

export async function getNigerianStates() {
    const response = await axios.get('http://locationsng-api.herokuapp.com/api/v1/states')
    return response.data
}
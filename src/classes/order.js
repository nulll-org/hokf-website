import * as firebase from '../firebase'

export class Order {
    constructor(order) {
        this.customer = order.customer;
        this.addressLine1 = order.addressLine1;
        this.addressLine2 = order.addressLine2 || null;
        this.city = order.city;
        this.state = order.state;
        this.country = order.country;
        this.date = firebase.timeStamp;
        this.status = order.status || 'pending';
        this.accessCode = order.accessCode;
        this.reference = order.reference;
    }
}

// class Customer {
//     constructor(customer) {
//         this.email = customer.email;
//         this.firstName = customer.firstName;
//         this.lastName = customer.lastName;
//         this.phoneNumber = customer.phoneNumber;
//     }
// }
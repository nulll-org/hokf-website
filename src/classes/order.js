export class Order {
    constructor(order, id) {
        this.id = id;
        this.email = order.email;
        this.firstName = order.firstName;
        this.lastName = order.lastName;
        this.phoneNumber = order.phoneNumber;
        this.addressLine1 = order.addressLine1;
        this.addressLine2 = order.addressLine2 || null;
        this.city = order.city;
        this.state = order.state;
        this.price = order.price;
        this.country = order.country;
        this.date = order.date;
        this.datePaid = order.datePaid;
        this.status = order.status || 'pending';
        this.accessCode = order.accessCode;
        this.reference = order.reference;
    }
}


// class Customer {
//     constructor(customer) {
//     }
// }
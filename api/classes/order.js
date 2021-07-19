export class Order {
    price = 0;
    email = String;
    firstName = String;
    lastName = String;
    phoneNumber = String;
    addressLine1 = String;
    addressLine2 = String;
    city = String;
    state = String;
    country = String;
    cartItems = Array();

    constructor(order) {
        this.email = order.email;
        this.firstName = order.firstName;
        this.lastName = order.lastName;
        this.phoneNumber = order.phoneNumber;
        this.addressLine1 = order.addressLine1;
        this.addressLine2 = order.addressLine2 || null;
        this.city = order.city;
        this.state = order.state;
        this.country = order.country;
        this.cartItems = order.cartItems;
        this.date = firebase.timeStamp;
        this.price = 0;
        this.cartItems.forEach((cartItem) => {
            this.price += cartItem.price;
        })
    }
}
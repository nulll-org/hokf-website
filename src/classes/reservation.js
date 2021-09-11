export class Booking {
  area = String;
  fromDate = Date;
  toDate = Date;
  email = String;
  firstName = String;
  lastName = String;
  phoneNumber = String;

  constructor(booking) {
    this.area = booking.area;
    this.fromDate = booking.fromDate;
    this.toDate = booking.toDate;
    this.email = booking.email;
    this.firstName = booking.firstName;
    this.lastName = booking.lastName;
    this.phoneNumber = booking.phoneNumber;
  }
}
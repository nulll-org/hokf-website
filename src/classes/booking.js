export class Booking {
  constructor(booking, id) {
    this.id = id;
    this.area = booking.area;
    this.date = booking.date;
    this.duration = booking.duration;
    this.phoneNumber = booking.phoneNumber;
    this.email = booking.email;
    this.name = booking.name;
    this.status = booking.status || 'pending';
    this.request = booking.request;
    this.time = booking.time;
  }
}
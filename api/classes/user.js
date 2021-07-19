export class User {
  firstName = String;
  lastName = String;
  email = String;
  phoneNumber = String;

  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
  }
}
import { required, email, pattern } from "@rxweb/reactive-forms";

export class OrderValidator {
    @required()
    firstName

    @required()
    lastName

    @email()
    @required()
    email

    @pattern({ expression: { 'nigerianPhoneNumber': /^[+][2][3][4]\d{10}$/ }, message: 'Phone number must begin with +234 then 10 digits' })
    @required()
    phoneNumber

    @required()
    addressLine1

    @required()
    addressLine2

    @required()
    city

    @required()
    state

    @required()
    state
    
}
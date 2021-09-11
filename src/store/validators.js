import { required, email, pattern, alphaNumeric, date } from "@rxweb/reactive-forms";

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

    @alphaNumeric({message: 'Address Line 2 must not contain any special characters'})
    addressLine2

    @required()
    city

    @required()
    state
}

export class ReservationValidator {
    @required()
    name

    @email()
    @required()
    email

    @pattern({ expression: { 'nigerianPhoneNumber': /^[+][2][3][4]\d{10}$/ }, message: 'Phone number must begin with +234 then 10 digits' })
    @required()
    phoneNumber
    
    @required()
    area

    @date()
    date

    @required()
    time

    @required()
    duration

    @alphaNumeric({allowWhiteSpace: true, message: 'No Special characters allowed'})
    request
}

export class QueryValidator {
    @required()
    name

    @email()
    @required()
    email

    @required()
    message
}
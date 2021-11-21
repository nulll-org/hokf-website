import { required, email, pattern, alphaNumeric, date, numeric, minNumber, maxNumber, toFloat } from "@rxweb/reactive-forms";

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

    @maxNumber({value: 24, message: 'Duration cannot be more than 24 hour'})
    @minNumber({value: 1, message: 'Duration cannot be less than 1 hour'})
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

export class ProductValidator {
    @required()
    name

    @required()
    photo

    @required()
    type

    @required()
    description

    @minNumber({value: 0, message: 'Price has to be greater than be 0'})
    @toFloat({message: 'Price must be a number'})
    @required()
    price

    @minNumber({value: 0, message: 'Quantity cannot be less that 0'})
    @numeric({message: 'Quantity must be a number'})
    xl

    @minNumber({value: 0, message: 'Quantity cannot be less that 0'})
    @numeric({message: 'Quantity must be a number'})
    l

    @minNumber({value: 0, message: 'Quantity cannot be less that 0'})
    @numeric({message: 'Quantity must be a number'})
    s

    @minNumber({value: 0, message: 'Quantity cannot be less that 0'})
    @numeric({message: 'Quantity must be a number'})
    xs

    @minNumber({value: 0, message: 'Quantity cannot be less that 0'})
    @numeric({message: 'Quantity must be a number'})
    m
    
    @maxNumber({value: 100, message: 'Percentage cannot be more that 100'})
    @minNumber({value: 0, message: 'Percentage cannot be less that 0'})
    @toFloat({message: 'Percentage must be a number'})
    discountPercentage
}

export class LoginValidator {
    @email()
    @required()
    email

    @required()
    password
}
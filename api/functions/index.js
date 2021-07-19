const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

serviceAccount = require("../house-of-kits-and-fits-3541a255648c.json")
const adminConfig = admin.credential.cert(serviceAccount)

admin.initializeApp(adminConfig)

let mailTransporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: functions.config().mailtrap.user,
        pass: functions.config().mailtrap.pass
    }
})

const productsCollection = admin.firestore().collection('products')
const orderCollection = admin.firestore().collection('orders')

// exports.helloWorld = functions.https.onRequest((request, response) => {
//     functions.logger.info("Hello logs!", { structuredData: true });
//     response.send("Hello from Firebase!");
// });

exports.checkOut = functions.https.onRequest((request, response) => {
    order = request.body.order;
    const orderedItems = Promise.all(order.cartItems)
    const cartItems = orderedItems.then(cartItems => {
        let cartItemArray = []
        cartItems.forEach(cartItem => {
            const product = productsCollection.doc(cartItem.product).get();
            cartItemArray.push({ product: product, quantity: cartItem.quantity || 1 });
        })
        return cartItemArray;
    })
    const orderPrice = cartItems.then(cartItems => {
        let cartItemPrices = 0;
        cartItems.forEach(cartItem => {
            const product = Promise.resolve(cartItem.product)
            product.then(product => {
                cartItemPrices += (getProductPrice(product.data()) * cartItem.quantity)
            })
        })
        return cartItemPrices;
    })
    orderPrice.then(price => {
        console.log(price)
        response.send({ price: price })
    })

    // Promise.all(order.cartItems)
    //     .then(cartItems => {
    //         var cartItems = []
    //         cartItems.forEach(cartItem => {
    //             const product = productsCollection.doc(cartItem.product).get();
    //         })
    //         return cartItems;
    //     })
    //     .then(cartItems => {
    //         console.log(cartItems)
    //         // cartItems.forEach(cartItem => {
    //         //     Promise.resolve(cartItem.product)
    //         //         .then(product => {
    //         //             orderPrice +=
    //         //         })
    //         // })
    //         return Promise.all(cartItems)
    //             .then(cartItems => {
    //                 let orderPrice = 0;
    //                 cartItems.forEach(cartItem => {
    //                     Promise.resolve(cartItem.product)
    //                         .then(product => {
    //                             orderPrice += (getProductPrice(product.data()) * cartItem.quantity);
    //                         })
    //                 })
    //                 return orderPrice
    //             })
    //     })
    //     .then(orderPrice => {
    //         order.price = orderPrice;
    //         // console.log(order);
    //         // const paystackResponse = makePayment(order, response);
    //         // paystackResponse.then(
    //         //     (paystackResponse) => {
    //         //         content = {
    //         //             subject: 'Your Order has been placed successfully',
    //         //             html: `<h1>${order.firstName}</h1> <p>your order has been placed.</p> <p> Please make payment <a href="${paystackResponse.data.authorization_url}">here</a> </p>`
    //         //         }
    //         //         order.reference = paystackResponse.data.reference
    //         //         console.log(order)
    //         //         // orderCollection.add(Object.assign({}, order));
    //         //         sendMail(order.email, content, response, true)
    //         //         response.status(200).send({ status: 'success', message: 'Order placed successfully' })
    //         //     })
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         response.status(500).send(error);
    //     })
})

async function makePayment(order) {
    const options = {
        port: 443,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${functions.config().paystack_test.secret}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: order.email, amount: parseInt((order.price) * 100) })
    };

    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', options)
    return paystackResponse.json();
}

function sendMail(receipient, content, response, test = false) {
    if (test) {
        const mailConfig = {
            from: 'info@hokfgardens.com',
            to: receipient,
            subject: content.subject,
            html: content.html
        }

        // Add HTML templating code
        return mailTransporter.sendMail(mailConfig, (error, info) => {
            if (error) {
                return response.send(error.toString())
            }
            return response.status(200).send('Order Placed and Email Sent Successfully')
        })
    } else {
        admin.firestore().collection('mail').add({
            to: receipient,
            message: content
        }).then(() => {
            // orderCollection.add(Object.assign({}, order));
            response.status(200).send('Order Placed and Email Sent Successfully');
        }).catch((error) => {
            response.status(500).send(error);
        })
    }

}

function getProductPrice(product) {
    return product.price - (product.price * product.discountPercentage / 100)
}
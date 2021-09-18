import { mail } from "../firebase";

export function sendMail(receipient, content) {
  mail.add({
    to: receipient,
    message: {
      subject: content.subject,
      html: content.message,
    },
  });
}

export function sendTemplateMail(receipient, name, data) {
  mail.add({
    to: receipient,
    template: {
      name: name,
      data: data,
    },
  });
}

export function sendOrderMail(receipient, content) {
  mail.add({
    to: receipient,
    template: {
      name: "NewOrder",
      data: {
        cartItems: content.cartItems,
        price: content.order.price,
        firstName: content.firstName,
        lastName: content.lastName,
        addressLine1: content.addressLine1,
        addressLine2: content.addressLine2,
        city: content.city,
        state: content.state,
        country: content.country,
      },
    },
  });
}

export async function sendOrderReminderMail(receipient, content) {
  await mail.add({
    to: receipient,
    template: {
      name: "orderReminder",
      data: {
        cartItems: content.cartItems,
        price: content.price,
        firstName: content.firstName,
        lastName: content.lastName,
        paymentURL: `https://checkout.paystack.com/${content.accessCode}`,
      },
    },
  });
}

export function sendMailToAdmin(content) {
  sendMail("info@hokfgardens.com", content);
}

export function sendTemplateMailToAdmin(name, data) {
  sendTemplateMail("info@hokfgardens.com", name, data);
}

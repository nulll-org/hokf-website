import { mail } from "../firebase";

export function sendMail (receipient, content) {
    mail.add({
        to: receipient,
        message: {
            subject: content.subject,
            html: content.message,
        }
    })
}

export function sendMailToAdmin(content) {
    sendMail('info@hokfgardens.com', content);
}
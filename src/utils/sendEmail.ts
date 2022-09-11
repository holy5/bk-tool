import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

declare interface EmailOptions {
    subject: string;
    messageHtml?: string;
    content?: string;
}
declare interface Auth {
    username: string;
    password: string;
}

export default function sendEmail(auth: Auth, emailOptions: EmailOptions) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: auth.username,
            pass: auth.password,
        },
        tls: {
            rejectUnauthorized: true,
        },
    });
    transporter.sendMail({
        from: auth.username,
        to: process.env.EMAIL_TO,
        subject: emailOptions.subject,
        text: emailOptions.content,
        html: emailOptions.messageHtml,
    });
}

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

declare interface Email {
    subjectName: string;
    content: string;
    name: string;
    html?: string;
    viewUrl?: string;
}

export default function sendEmail(email: Email) {
    let html = /*html*/ `
    <div>
    <h2>${email.subjectName}</h2>
    <h3>${email.name}</h3>
    <h3>Description:</h3>
    <p>${email.html}</p>
    <h3>See:</h3>
    <a href=${email.viewUrl}>${email.viewUrl}</a>
    </div>
    `;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.APP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: true,
        },
    });
    transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: `You have a due in ${email.subjectName}`,
        text: email.content,
        html,
    });
}

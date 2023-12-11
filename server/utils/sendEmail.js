import nodemailer from "nodemailer";
import { createJWT } from "./index.js";

import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
});


export const sendVerifyEmail = (data) => {
    const token = createJWT(data, "1h");
    const link = `http://localhost:${process.env.PORT}/users/verify/${token}`;

    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: data.email,
        subject: 'Verify Email',
        html: `<div
            style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;'>
            <h3 style="color: rgb(8, 56, 188)">Please verify your email address</h3>
            <hr>
            <h4>Hi there,</h4>
            <p>
                Please verify your email address so we can know that it's really you.
                <br>
            <p>This link <b>expires in 1 hour</b></p>
            <br>
            <a href=${link}
                style="color: #fff; padding: 14px; text-decoration: none; background-color: #000;  border-radius: 8px; font-size: 18px;">Verify
                Email Address</a>
            </p>
            <div style="margin-top: 20px;">
                <h5>Best Regards</h5>
                <h5>HTP Team</h5>
            </div>
        </div>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

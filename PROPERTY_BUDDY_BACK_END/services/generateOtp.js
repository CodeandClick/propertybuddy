import nodemailer from 'nodemailer';
import otpDb from '../model/otpModel.js';
import path from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
config()
// Utility to get __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
});

export const sendOPTVerificationEmail = async (email) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        // MAIL OPTIONS
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `
                <div style="background-color: #071c1f; padding: 20px; text-align: center; font-family: Arial, sans-serif; color: #222;">
                    <img src="cid:logo" alt="Your Logo" style="max-width: 150px; margin-bottom: 20px;">
                    <h1 style="color: #fff;">Email Verification</h1>
                    <p style="font-size: 16px; color: #fff;">Thank you for signing up! Please verify your email address by entering the OTP below:</p>
                    <div style="margin: 20px 0;">
                        <span style="display: inline-block; padding: 10px 20px; font-size: 24px; font-weight: bold; background-color: #222; color: #FFD700; border-radius: 5px;">
                            ${otp}
                        </span>
                    </div>
                    <p style="font-size: 14px; color: #000;">If you did not request this, please ignore this email.</p>
                </div>
            `,
            attachments: [
                {
                    filename: 'propertybuddywhitelogo.png', // Name of the file
                    path: path.join(__dirname, '../assets/images/propertybuddywhitelogo.png'), // Corrected path to the image file
                    cid: 'logo' // Same as the value in the src attribute in the HTML
                }
            ]
        };

        const newOptVerification = new otpDb({
            userEmail: email,
            otp: otp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000   
        });

        await newOptVerification.save();
        await transporter.sendMail(mailOptions);
        console.log('otp send successfully')
        return {
            error: false,
            status: "PENDING",
            message: "Verification OTP email sent",
            data: {
                userEmail: email,
                email: email
            }
        };
    } catch (error) {
        console.log(error);
        return {
            error: true,
            status: "CANCELED",
            message: "Failed to send Verification OTP"
        };
    }
}

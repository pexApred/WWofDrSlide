const nodemailer = require('nodemailer');
const config = require('../config/config');
require('dotenv').config();

const sendEmail = (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.EMAIL,
            pass: config.PASSWORD
        }
    });

    const mailOptions =  {
        from: config.EMAIL,
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return { success: false, error };
        }
        return { success: true, info };
    });
};

module.exports = sendEmail;
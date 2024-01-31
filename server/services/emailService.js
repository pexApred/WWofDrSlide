const nodemailer = require('nodemailer');
const config = require('../config/config');

const sendEmail = (to, subject, text) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: config.EMAIL,
                pass: config.PASSWORD
            },
            tls: {
                ciphers: 'SSLv3',
            }
        });

        const mailOptions = {
            from: config.EMAIL,
            to,
            subject,
            text
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};

module.exports = sendEmail;
const nodemailer = require('nodemailer');
const config = require('../config/mailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    sendEmail(from, to, subject, html) {
        return new Promise((resolve, reject) => {
            transport.sendMail({
                from,
                subject,
                to,
                html
            }, (err, info) => {
                if (err) reject(err);
                resolve(info);
            });
        });
    }
};

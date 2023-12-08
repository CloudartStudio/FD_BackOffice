class MailSender {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.smtpConfig = {
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: this.username,
                pass: this.password,
            },
        };
    }

    sendMail(to, subject, body) {
        const nodemailer = require("nodemailer");

        const transporter = nodemailer.createTransport(this.smtpConfig);

        const mailOptions = {
            from: this.username,
            to: to,
            subject: subject,
            text: body,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        });
    }
}

module.exports = MailSender;

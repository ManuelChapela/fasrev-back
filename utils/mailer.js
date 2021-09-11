const nodemailer = require('nodemailer');

exports.mailer = async (email, usernameTo, usernameFrom, mensaje) => {
    let transporter;

    if (process.env.SMTP_SERVICE) {
        transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    } else {
        // si no hemos configurado en .env servidor de correo
        // usamos ethereal.mail para simular un servidor smtp
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass // generated ethereal password
            }
        });
    }

    const htmlMail = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tienes un mensaje nuevo</title>
        </head>
        <body>
            <h1>${usernameTo} tienes un mensaje nuevo</h1>
        <div>${usernameFrom} te ha mandado un mensaje:</div>
        <div>${mensaje}</div>
        </body>
        </html>`;

    let mailOptions = {
        from: 'fasrev@email.com',
        to: email,
        subject: `${usernameTo} tienes un mensaje nuevo`,
        text: `Este es el mensaje que te manda ${usernameFrom}:
    ${mensaje}`,
        html: htmlMail
    };

    const mailResponse = await transporter.sendMail(mailOptions).catch((error) => {
        throw error;
    });

    return nodemailer.getTestMessageUrl(mailResponse) || 'OK';
};

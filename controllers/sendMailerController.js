const { mailer } = require('../utils/mailer');

exports.sendMail = async (req, res, next) => {
    const { email, username, message } = req.body;

    if (!email || !username || !message) {
        next({
            status: 400,
            message: `ERROR, Mensaje no enviado: email, username y mensaje son requeridos`
        });
    }
    try {
        const mailResult = await mailer(email, username, 'FasRev', message);
        console.log(mailResult);
        res.send({
            OK: 1,
            message: 'Mensaje enviado: ',
            mailResult
        });
    } catch (error) {
        next({
            status: 400,
            message: `ERROR, Mensaje NO enviado:, ${error}`
        });
    }
};

const Form = require('../models/Form');
const { mailer } = require('../utils/mailer');

exports.addForm = async (req, res, next) => {
    console.log(req.body);

    const { username, telephone, email, textField } = req.body;

    if (!username || !telephone || !email || !textField) {
        next({
            status: 401,
            message: 'ERROR, todos los campos son requeridos'
        });
    }

    const newForm = new Form({
        username,
        telephone,
        email,
        textField
    });
    try {
        const result = await newForm.save();
        const msg = 'Hemos recibido tu solicitud, nos pondremos en contacto lo antes posible contigo.';
        const mailResult = await mailer(email, username, 'FasRev', msg);
        console.log(mailResult);
        res.send({
            OK: 1,
            message: 'Formulario añadido',
            id: result.id
        });
    } catch (error) {
        next({
            status: 402,
            message: `ERROR, Formulario NO añadido:, ${error}`
        });
    }
};


exports.getForms = async (req, res, next) => {
    try {
        const result = await Form.find({}, { _id: 0, __v: 0 });
        if (result) {
            res.send({
                OK: 1,
                status: 200,
                message: 'todos los Formularios obtenidos',
                Forms: result
            });
        } else {
            next({
                status: 400,
                message: 'No hay Formularios en la base de datos'
            });
        }
    } catch (error) {
        next({
            status: 500,
            message: `ERROR, no se han podido obtener Formularios: ${error}`
        });
    }
};

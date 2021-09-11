const mongoose = require('../database/mongoose');
const { nanoid } = require('nanoid');

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const formSchema = new mongoose.Schema({
    id: {
        type: String,
        default: nanoid,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validateEmail, 'email no válido.']
    },
    textField: {
        type: String,
        required: true
    }
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;

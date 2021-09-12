const express = require('express');

const router = express.Router();
const { addForm, getForms } = require('../controllers/FormController');

router
    .route('/').get(getForms).post(addForm);

module.exports = router;

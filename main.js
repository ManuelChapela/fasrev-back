'use Strict';

const express = require('express');
require('dotenv').config();

const formRouter = require('./routes/formRouter');
const sendMailRouter = require('./routes/sendMailRouter');

const errorMiddleware = require('./middlewares/errorMiddleware');

const server = express();

const PORT = process.env.PORT || 3000;

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// test endpoint
server.get('/', (req, res) => {
    res.send("Hello World! I'm a API server");
});

server.use('/forms', formRouter, errorMiddleware);
server.use('/sendmail', sendMailRouter, errorMiddleware);

server.listen(PORT, () => {
    console.log(`API server running at port ${PORT}`);
});

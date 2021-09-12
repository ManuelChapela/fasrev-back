
const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = process.env.DB_URI || 'mongodb://localhost/fasrev';

mongoose
    .connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.info('Connected to DB!', DB_URI);
    })
    .catch((err) => console.error('DB conection error:', err));

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.info('> mongoose succesfully disconnected!');
        process.exit(0);
    });
});

module.exports = mongoose;

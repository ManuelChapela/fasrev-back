const errorMiddleware = (error, req, res, next) => {
    res.status(error.status).send({
        OK: 0,
        message: error.message
    });
};

module.exports = errorMiddleware;

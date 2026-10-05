const errorHandler = (err, req, res, next) => {

     // Invalid MongoDB ObjectId
    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid task ID'
        });
    }


    // if (err.statusCode) {
    //     return res.statusCode(err.statusCode).json({
    //         message: err.message
    //     })
    // }
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    console.error(err);


    return res.status(500).json({
        message: 'Internal Server Error',
        error: err.message
    });


}

module.exports = errorHandler;
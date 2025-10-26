const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        error: 'not Found'
    });
}

const errorHandler = (err, req, res, next) => {
    console.error('Error', err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? 'something went wrong' : err.stack
    });
}


module.exports = {
    notFoundHandler,
    errorHandler
}

module.exports = function(error, req, res, next) {
    res.status(error.status || 400).json({
        msg : error.msg || 'Unknown error occured',
        status : error.status || 400
    });
}
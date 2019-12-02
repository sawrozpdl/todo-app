const jwt = require('jsonwebtoken');
const config = require('../config.json');

module.exports = function(req, res, next) {
    console.log('auth', req.headers);
    if (!req.headers.authorization) {
        return next({
            msg : 'Please login for the access',
            status : 401
        });
    }
    const receivedToken = req.headers.authorization.split(' ')[1];
    if (!receivedToken) {
        return next({
            msg : 'You have no access to this page!',
            status : 401
        });
    }
    console.log('Server got -> ', receivedToken);
    jwt.verify(receivedToken, config.accessTokenSecret, function(error, decoded) {
        if (error) {
            next({
                msg : 'Invalid or Modified Token',
                error,
                status : 401
            })
        }
        else {
            req.body.username = decoded.data;
            req.body.userRole = decoded.role;
            next();
        }
    });
}
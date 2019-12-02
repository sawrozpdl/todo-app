const router = require('express').Router();
const logInUser = require('../services/user.login');

router.route('/')
.post(logInUser)
.get(function (req, res, next) {
    res.json({
        msg : 'Login Form Goes Here??'
    });
})

module.exports = router;
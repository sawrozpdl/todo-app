const router = require('express').Router();
const control = require('../controllers/user.controller');

router.route('/')
  .get(function (req, res, next) {
    res.json({
      msg : 'Signup Form Goes Here??'
    });
  }) 
  .post(control.addUser)

  router.route('/:value')
  .get(function (req, res, next) {
    res.json({
      msg : req.params.value
    });
  });

module.exports = router;
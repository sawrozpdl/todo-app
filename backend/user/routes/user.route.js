const router = require('express').Router();
const control = require('../controllers/user.controller');

router.route('/')
    .get(control.getAllUsers)
    .post(control.addUser)

router.route('/:username')
    .get(control.getUser)
    .put(control.putUser)
    .patch(control.patchUser)
    .delete(control.removeUser)

module.exports = router;
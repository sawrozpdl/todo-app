const route = require('express').Router();

const signupRoute = require('../user/routes/signup.route');
const loginRoute = require('../user/routes/login.route');
const userRoute = require('../user/routes/user.route');
const todosRoute = require('../todos/routes/todos.route');

const authorize = require('../middlewares/authorize');
const refreshToken = require('../middlewares/refresh.token');

route.use('/signup', signupRoute);
route.use('/login', loginRoute);

route.get('/refreshToken', refreshToken);

route.use('/users', userRoute);
route.use('/todos',authorize, todosRoute);

route.use(function (req, res, next) {
    res.json({
        msg : 'Hello from my API!'
    });
});


module.exports = route;
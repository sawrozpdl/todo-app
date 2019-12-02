const jwt = require("jsonwebtoken");
const userService = require('./user.service');
const config = require('../../config.json');

module.exports = function(req, res, next) {
  userService.find(req.body.username)
    .then(function(result) {
      if (result.length == 0)
        next({
          msg: "No user"
        });
      if (req.body.password === result[0].password) {
        const accessToken = jwt.sign(
          {
            data: req.body.username,
            role : result[0].role
          },
          config.accessTokenSecret,
          {
            expiresIn : config.accessTokenLifeSpan
          } 
        );
        const refreshToken = jwt.sign(
          {
            data: req.body.username,
            role : result[0].role
          },
          config.refreshTokenSecret,
          {
            expiresIn : config.refreshTokenLifeSpan
          } 
        );
        userService.patch(req.body.username, {
          refreshToken : refreshToken
        });
        res.json({
          msg : 'You are logged in!',
          accessToken : accessToken,
          refreshToken : refreshToken,
          username: req.body.username,
          userRole:result[0].role
      });
      } else
        next({
          msg: "Wrong Password"
        });
    })
    .catch(function(error) {
      next({
        msg: error
      });
    });
};

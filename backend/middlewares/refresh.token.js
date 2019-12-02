const jwt = require("jsonwebtoken");
const config = require("../config.json");
const userService = require("../user/services/user.service");

module.exports = function(req, res, next) {
  const refreshToken = req.headers.refreshtoken;
  if (!refreshToken) {
    next({
      msg: "No Refresh Token!",
      status: 401
    });
  }
  jwt.verify(refreshToken, config.refreshTokenSecret, function(error, decoded) {
    if (error) {
      return next({
        msg: "Refresh token is invalid or modified",
        status: 401
      });
    }
    userService
      .getUserBy("refreshToken", {
        username: decoded.data
      })
      .then(function(results) {
        if (refreshToken != results[0].refreshToken) {
          next({
            msg: "Invalid refresh token!",
            status: 401
          });
        } else {
          const token = jwt.sign({data : decoded.data, role : decoded.role}, config.accessTokenSecret, {
            expiresIn: config.accessTokenLifeSpan
          });
          res.json({
            accessToken: token
          });
        }
      })
      .catch(function(error) {
        next({
          msg: error
        });
      });
  });
};

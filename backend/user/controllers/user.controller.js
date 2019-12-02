userService = require("../services/user.service");

function getAllUsers(req, res, next) {
  console.log("get all users");
  userService
    .findAll()
    .then(function(result) {
      res.json({
        status: "Success",
        data: result
      });
    })
    .catch(function(error) {
      next({
        msg: error
      });
    });
}

function addUser(req, res, next) {
  console.log('The body is=> ', req.body.username);
  userService
    .add({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    .then(function(result) {
      res.json({
        status: "success",
        msg: "User Added"
      });
    })
    .catch(function(error) {
      next({
        msg: error
      });
    });
}

function removeUser(req, res, next) {
  userService
    .remove(req.params.username)
    .then(function(result) {
      res.json({
        status: "success",
        msg: "User Removed!"
      });
    })
    .catch(function(error) {
      next({
        msg: error
      });
    });
}

function putUser(req, res, next) {
  userService
    .put(req.params.username, {
      email: req.body.email,
      password: req.body.password
    })
    .then(function(result) {
      res.json({
        status: "success",
        msg: "User Updated"
      });
    })
    .catch(function(error) {
      next({
        msg: error
      });
    });
}

function patchUser(req, res, next) {
  userService
    .patch(req.params.username, req.body)
    .then(function(result) {
      res.json({
        status: "success",
        msg: "User Updated"
      });
    })
    .catch(function(error) {
      next({
        msg: error
      });
    });
}

function getUser(req, res, next) {
  userService
    .find(req.params.username)
    .then(function(result) {
      res.json({
        status: "success",
        user: result[0]
      });
    })
    .catch(function(error) {
      next({
        msg: error
      });
    });
}

module.exports = {
  getAllUsers,
  addUser,
  removeUser,
  putUser,
  patchUser,
  getUser
};

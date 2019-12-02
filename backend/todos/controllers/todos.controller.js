todoService = require("../services/todos.service");

function getTodos(req, res, next) {
  if (req.userRole === "admin") getAllTodos(req, res, next);
  else getTodosOf(req, res, next);
}

function getAllTodos(req, res, next) {
  todoService
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

function getTodosOf(req, res, next) {
  todoService
    .getTodosFor(req.body.username)
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

function addTodo(req, res, next) {
  todoService
    .add(req.body.content, req.body.tags)
    .then(function(success) {
      return todoService.idFor(req.body.content) // if values to be passed use return 
    })
    .then(function(result) { // result is the above returned output
      let todo_id = result[0].todo_id;
      todoService.registerTodoFor(req.body.username, todo_id)
    })
    .then(function(success) {
      res.json({
        status: "success",
        msg: "Todo Added"
      });
    })
    .catch(function(error) {
      next({
        msg: error
      });
    });
}

function removeTodo(req, res, next) {
  todoService
    .remove(req.params.todo_id)
    .then(function(result) {
      res.json({
        status: "success",
        msg: "Todo Removed!"
      });
    })
    .catch(function(error) {
      next({
        msg: error
      });
    });
}

function putTodo(req, res, next) {
  todoService
    .put(req.params.todo_id, req.body.content)
    .then(function(result) {
      res.json({
        status: "success",
        msg: "Todo Updated"
      });
    })
    .catch(function(error) {
      next({
        msg: error
      });
    });
}

function getTodo(req, res, next) {
  todoService
    .find(req.params.todo_id)
    .then(function(result) {
      if (result[0]) {
        res.json({
          status: "success",
          todo: result[0]
        });
      } else
        next({
          msg: `No todo found with id : ${req.params.todo_id}`
        });
    })
    .catch(function(error) {
      next({
        msg: error
      });
    });
}

function addTags(req, res, next) {
  todoService
    .find(req.params.todo_id)
    .then(function(result) {
      todoService.patch(req.params.todo_id, {
        tags: result[0].tags + req.body.tags
      });
    })
    .then(function(success) {
      res.json({
        status: "success"
      });
    })
    .catch(function(error) {
      next({
        msg: error
      });
    });
}

module.exports = {
  getTodos,
  addTodo,
  addTags,
  removeTodo,
  putTodo,
  getTodo
};

const router = require('express').Router();
const todoControl = require('../controllers/todos.controller');

router.route('/')
    .get(todoControl.getTodos)
    .post(todoControl.addTodo)

router.route('/:todo_id')
    .get(todoControl.getTodo)
    .put(todoControl.putTodo)
    .delete(todoControl.removeTodo)
    .patch(todoControl.addTags)
    

module.exports = router;
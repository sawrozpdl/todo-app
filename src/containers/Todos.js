import React from "react";
import Todo from "../components/Todo";
import "./Todos.css";

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleCheck(id) {
    this.props.handleCheck(id);
  }

  handleDelete(id) {
    this.props.handleDelete(id);
  }

  render() {
    const todos = this.props.todos;
    let todo_todos = [];
    let completed_todos = [];
    todos.forEach(todo => {
      if (!todo.content.includes(this.props.keyword.toLowerCase())) return;
      let buffer = (
        <Todo
          todo = {todo}
          handleCheck={this.handleCheck}
          handleDelete={this.handleDelete}
        />
      );
      if (todo.isDone) completed_todos.push(buffer);
      else todo_todos.push(buffer);
    });
    return (
      <div className="todos-container">
        <div className="todo-todos">{todo_todos}</div>
        <div className="completed-todos">{completed_todos}</div>
      </div>
    );
  }
}

export default Todos;

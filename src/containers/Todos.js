import React from "react";
import Todo from '../components/Todo';
import "./Todos.css";

class Todos extends React.Component {
  render() {
    const todos = this.props.todos;
    let todo_todos;
    let completed_todos;
    todos.forEach(todo => {
      if (todo.isDone) completed_todos.push(<Todo todo />);
      else todo_todos.push(<Todo todo />);
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

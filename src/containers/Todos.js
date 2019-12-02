import React from "react";
import Todo from "../components/Todo";
import "./Todos.css";

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleCheck(id) {
    this.props.handleCheck(id);
  }

  handleDelete(id) {
    this.props.handleDelete(id);
  }

  handleEdit(id) {
      this.props.handleEdit(id);
  }

  handleAdd() {
    this.props.handleAdd();
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
          handleEdit = {this.handleEdit}
          handleDelete={this.handleDelete}
          key = {todo.todo_id}
        />
      );
      if (todo.isDone) completed_todos.push(buffer);
      else todo_todos.push(buffer);
    });
    return (
      <div className="todos-container">
        <div className="todo-todos">{todo_todos}</div>
        <div className="completed-todos">{completed_todos}</div>
        <div className='add-todo'> 
            <button className = 'add-button' onClick = {this.handleAdd}><i className = 'fa fa-plus'></i></button>
        </div>
      </div>
    );
  }
}

export default Todos;

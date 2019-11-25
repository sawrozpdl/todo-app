import React from "react";
import SearchBar from "../components/SearchBar";
import Todos from "./Todos";
import "./TodoArea.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSearchChange(data) {
    this.setState({
      search: data
    });
  }

  handleCheck(id) {
    this.props.todos.forEach(todo => {
      if (todo.id == id) {
        if (todo.isDone) todo.isDone = false;
        else todo.isDone = true;
      }
    });
    console.log(this.props.todos);
  }

  handleDelete(id) {
    let todos = this.props.todos;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == id) {
        todos.splice(i, 1);
      }
    }
    console.log(this.props.todos);
  }

  render() {
    return (
      <div className="todo-area">
        <SearchBar
          onChange={this.handleSearchChange}
          placeholder="Search todos"
        />
        <Todos
          todos={this.props.todos}
          keyword={this.state.search}
          handleCheck={this.handleCheck}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;

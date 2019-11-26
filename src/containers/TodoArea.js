import React from "react";
import Header from "../components/Header";
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
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleSearchChange(data) {
    this.setState({
      search: data
    });
  }

  handleCheck(id) {
    this.props.todos.forEach(todo => {
      if (todo.id == id) {
        todo.isDone = !todo.isDone;
        return;
      }
    });
    this.forceUpdate();
  }

  handleEdit(id) {
    this.props.todos.forEach(todo => {
      if (todo.id == id) {
        const target = document.getElementsByClassName(`todoContent${id}`)[0];
        todo.editMode = !todo.editMode;
        if (todo.editMode) target.focus();
        todo.content = target.value;
        return;
      }
    });
    this.forceUpdate();
  }

  handleDelete(id) {
    let todos = this.props.todos;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == id) {
        todos.splice(i, 1);
        return;
      }
    }
    this.forceUpdate();
  }

  handleAdd() {
    this.props.todos.push({
      id: Math.random() * 100,
      content: "",
      isDone: false,
      editMode: true
    });
    this.forceUpdate();
  }

  render() {
    return (
      <div className="app-main">
        <Header logoName="todo app" />
        <div className="todo-area">
          <SearchBar
            onChange={this.handleSearchChange}
            placeholder="Search todos"
          />
          <Todos
            todos={this.props.todos}
            keyword={this.state.search}
            handleCheck={this.handleCheck}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
            handleAdd={this.handleAdd}
          />
        </div>
      </div>
    );
  }
}

export default App;

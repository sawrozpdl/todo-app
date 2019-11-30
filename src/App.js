import React from "react";
import Singup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header";
import TodoArea from "./containers/TodoArea";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
  }

  componentWillMount() {
    this.setState({
      todos: [
        {
          id: 1,
          content: "complete this app",
          isDone: false,
          editMode: false
        },
        {
          id: 2,
          content: "integrate backend",
          isDone: false,
          editMode: false
        },
        {
          id: 3,
          content: "chill out",
          isDone: false,
          editMode: false
        }
      ]
    });
  }

  handleCheck(id) {
    this.state.todos.forEach(todo => {
      if (todo.id == id) {
        todo.isDone = !todo.isDone;
        return;
      }
    });
    this.setState({
      todos: this.state.todos
    });
  }

  handleEdit(id) {
    this.state.todos.forEach(todo => {
      if (todo.id == id) {
        const target = document.getElementsByClassName(`todoContent${id}`)[0];
        todo.editMode = !todo.editMode;
        if (todo.editMode) target.focus();
        todo.content = target.value;
        return;
      }
    });
    this.setState({
      todos: this.state.todos
    });
  }

  handleDelete(id) {
    let todos = this.state.todos;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == id) {
        todos.splice(i, 1);
        return;
      }
    }
    this.setState({
      todos: todos
    });
  }

  handleAdd() {
    this.state.todos.push({
      id: Math.random() * 100,
      content: "",
      isDone: false,
      editMode: true
    });
    this.setState({
      todos: this.state.todos
    });
  }

  signUpUser(user) {
    console.log(user);
  }

  render() {
    return (
      <div className="container">
        <Header logoName="todo app" />
        <Singup handleSignup = {this.signUpUser} title = 'SignUp to TODO App'/>
        <TodoArea
          todos={this.state.todos}
          handleCheck={this.handleCheck}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          handleAdd={this.handleAdd}
        />
      </div>
    );
  }
}

export default App;

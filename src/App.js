import React from "react";
import WelcomePage from "./components/WelcomePage.js";
import Singup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header";
import TodoArea from "./containers/TodoArea";
import Api from "./utils/Api";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      username: "",
      todoArea: false,
      accessKey: ""
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.logInUser = this.logInUser.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onSignupClick = this.onSignupClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);

    this.api = new Api("127.0.0.1", "api", 5000);
  }

  onLoginClick() {
    console.log("login");
  }

  onLogoutClick() {
    this.setState({
      username: "",
      accessKey: "",
      todos: [],
      todoArea: false
    });
    localStorage.setItem("refreshToken", "");
  }

  onSignupClick() {
    console.log("signup");
  }

  handleCheck(id) {
    this.state.todos.forEach(todo => {
      if (todo.todo_id == id) {
        todo.isDone = +!todo.isDone;
        this.updateTodo({
          todo_id: todo.todo_id,
          isDone: todo.isDone
        });
        return;
      }
    });
    this.setState({
      todos: this.state.todos
    });
  }

  handleEdit(id) {
    console.log("You clicked => ", id);
    this.state.todos.forEach(todo => {
      if (todo.todo_id == id) {
        const target = document.getElementsByClassName(`todoContent${id}`)[0];
        todo.editMode = +!todo.editMode;
        todo.content = target.value;
        if (todo.editMode) target.focus();
        this.updateTodo({
          todo_id: todo.todo_id,
          content: todo.content,
          editMode: todo.editMode
        });
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
      if (todos[i].todo_id == id) {
        todos.splice(i, 1);
        return;
      }
    }
    this.removeTodo({
      todo_id: id
    });
    this.setState({
      todos: todos
    });
  }

  handleAdd() {
    let buffer = {
      todo_id: Math.floor(Math.random() * 100),
      content: "",
      isDone: 0,
      editMode: 1
    };
    this.addTodo(buffer);
    this.state.todos.push(buffer);
    this.setState({
      todos: this.state.todos
    });
  }

  signUpUser(user) {
    this.api
      .post({
        endpoint: "signup",
        content: user,
        json: false
      })
      .then(json => console.log(json));
  }

  logInUser(user) {
    this.api
      .post({
        endpoint: "login",
        content: user,
        json: false
      })
      .then(json => {
        this.setState({
          username: json.username
        });
        this.setState({
          accessKey: json.accessToken
        });
        this.api.setAccessKey(this.state.accessKey);
        localStorage.setItem("refreshKey", json.refreshToken);
        this.populateTodos();
        this.setState({
          todoArea: true
        });
      });
  }

  addTodo(todo) {
    this.api
      .post({
        endpoint: "todos",
        content: {todo},
        json: true
      })
      .then(json => {
        console.log("todos added ", json);
      });
  }

  removeTodo(todo) {
    this.api
      .delete({
        endpoint: "todos",
        content: {todo},
        json: true,
        subEndpoint: todo.todo_id
      })
      .then(json => {
        console.log("todos added ", json);
      });
  }

  async updateTodo(todo) {
    await this.api
      .patch({
        endpoint: "todos",
        content: {todo},
        json: true,
        subEndpoint: todo.todo_id
      })
      .then(json => {
        console.log("todos added ", json);
      });
  }

  refreshAccessKey() {
    this.api
      .get({
        endpoint: "refreshToken",
        refreshToken: localStorage.getItem("refreshToken")
      })
      .then(json => {
        this.setState({
          accessKey: json.accessToken
        });
        this.api.setAccessKey(this.state.accessKey);
      });
  }

  async populateTodos() {
    // making this synchronous
    await this.api
      .get({
        endpoint: "todos"
      })
      .then(json => {
        console.log("JSONY", json);
        this.setState({
          todos: json.data
        });
      });
  }

  render() {
    return (
      <Router>
        {this.state.todoArea ? <Redirect to="/todos" /> : <div> </div>}
        <Header
          user={this.state.username}
          logoName="todo app"
          onLoginClick={this.onLoginClick}
          onSignupClick={this.onSignupClick}
          onLogoutClick={this.onLogoutClick}
        />
        <Route
          path="/"
          exact
          render={props => (
            <WelcomePage {...props} title="Welcome to TODO App" />
          )}
        />
        <Route
          path="/signup"
          render={props => (
            <Singup
              {...props}
              handleSignup={this.signUpUser}
              title="SignUp to TODO App"
            />
          )}
        />
        <Route
          path="/login"
          render={props => (
            <Login
              {...props}
              handleLogin={this.logInUser}
              title="LogIn to TODO App"
            />
          )}
        />
        <Route
          path="/todos"
          render={props => (
            <TodoArea
              {...props}
              todos={this.state.todos}
              handleCheck={this.handleCheck}
              handleEdit={this.handleEdit}
              handleDelete={this.handleDelete}
              handleAdd={this.handleAdd}
            />
          )}
        />
      </Router>
    );
  }
}

export default App;

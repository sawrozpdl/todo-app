import React from "react";
import WelcomePage from "./components/WelcomePage.js";
import Singup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header";
import TodoArea from "./containers/TodoArea";
import { getUriForm } from "./utils/Utils";
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
  }

  onLoginClick() {
    console.log("login");
  }

  onLogoutClick() {
    this.setState({
      username : '',
      accessKey : '',
      todos : [],
      todoArea : false
    });
    localStorage.setItem('refreshToken', '');
  }

  onSignupClick() {
    console.log("signup");
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
    fetch("http://127.0.0.1:5000/api/signup", {
      method: "POST",
      body: getUriForm(user),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${this.state.acessKey}`
      }
    })
      .then(response => response.json())
      .then(json => console.log(json));
  }

  logInUser(user) {
    fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      body: getUriForm(user),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${this.state.accessKey}`
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json.username);
        this.setState({
          username: json.username
        });
        console.log(json);
        this.setState({
          accessKey: json.accessToken
        });
        localStorage.setItem("refreshKey", json.refreshToken);
        this.populateTodos();
        this.setState({
          todoArea: true
        });
      });
  }

  refreshAccessKey() {
    fetch("http://127.0.0.1:5000/api/refreshToken", {
      method: "GET",
      headers: {
        refreshtoken: localStorage.getItem("refreshToken")
      }
    }).then(response => response.json()).then(json => {
      this.setState({
        accessKey : json.accessToken
      })
    });
  }

  async populateTodos() { // making this synchronous
    await fetch("http://127.0.0.1:5000/api/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `bearer ${this.state.accessKey}`
      }
    })
      .then(response => response.json())
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

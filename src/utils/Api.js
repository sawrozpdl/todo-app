import { getUriForm } from "../utils/Utils";

function signUpUser(user) {
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

function logInUser(user) {
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

function addTodo(todo) {
  fetch("http://127.0.0.1:5000/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `bearer ${this.state.accessKey}`
    },
    body: getUriForm(todo)
  })
    .then(response => response.json())
    .then(json => {
      console.log("JSONY", json);
      this.setState({
        todos: json.data
      });
    });
}

function refreshAccessKey() {
  fetch("http://127.0.0.1:5000/api/refreshToken", {
    method: "GET",
    headers: {
      refreshtoken: localStorage.getItem("refreshToken")
    }
  })
    .then(response => response.json())
    .then(json => {
      this.setState({
        accessKey: json.accessToken
      });
    });
}

async function populateTodos() {
  // making this synchronous
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



module.exports = {
    populateTodos,
    refreshAccessKey,
    logInUser,
    signUpUser,
    addTodo
}

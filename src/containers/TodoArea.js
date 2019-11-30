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
    this.props.handleCheck(id);
  }

  handleEdit(id) {
    this.props.handleEdit(id)
  }

  handleDelete(id) {
    this.props.handleDelete(id);
  }

  handleAdd() {
    this.props.handleAdd();
  }

  render() {
    return (
      <div className="app-main">
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

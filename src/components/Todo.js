import React from 'react';
import './Todo.css';

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleCheck(e) {
        this.props.handleCheck(this.props.todo.id);
    }

    handleDelete(e) {
        this.props.handleDelete(this.props.todo.id);
    }

    render() {
        return (
            <div className = 'todo'>
                <input className = 'todo-isDone' type = 'checkbox' name = 'isDone' onChange = {this.handleCheck}/>
                <span className = 'todo-content'>{this.props.todo.content}</span>
                <button className = 'todo-update-button' onClick = {this.handleEdit}><i className = 'fa fa-edit'></i></button>
                <button className = 'todo-delete-button' onClick = {this.handleDelete}><i className = 'fa fa-delete'></i></button>
            </div>
        );
    }
}


export default  Todo;
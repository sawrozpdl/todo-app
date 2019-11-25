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
            <div className = 'todo cfix'>
                <div className = 'content-area'>
                    <input className = 'todo-isDone' type = 'checkbox' name = 'isDone' onClick = {this.handleCheck}/>
                    <span className = 'todo-content'>{this.props.todo.content}</span>
                </div>
                <div className = 'button-area'>
                    <button className = 'todo-edit-button' onClick = {this.handleEdit}><i className = 'fa fa-edit'></i></button>
                    <button className = 'todo-delete-button' onClick = {this.handleDelete}><i className = 'fa fa-trash'></i></button>
                </div>
            </div>
        );
    }
}


export default  Todo;
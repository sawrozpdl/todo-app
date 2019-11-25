import React from 'react';
import './Todo.css';

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleCheck(e) {
        this.props.handleCheck(this.props.todo.id);
    }

    handleEdit(e) {
        this.props.handleEdit(this.props.todo.id);
    }

    handleDelete(e) {
        this.props.handleDelete(this.props.todo.id);
    }

    render() {
        let editClass = (this.props.todo.editMode) ? 'fa fa-save' : 'fa fa-edit';
        return (
            <div className = 'todo cfix'>
                <div className = 'content-area'>
                    <input className = 'todo-isDone' type = 'checkbox' name = 'isDone' onClick = {this.handleCheck} checked = {this.props.todo.isDone}/>
                    <textarea className = {`todo-content todoContent${this.props.todo.id}`} readOnly = {!this.props.todo.editMode}>{this.props.todo.content}</textarea>
                </div>
                <div className = 'button-area'>
                    <button className = 'todo-edit-button' onClick = {this.handleEdit}><i className = {editClass}></i></button>
                    <button className = 'todo-delete-button' onClick = {this.handleDelete}><i className = 'fa fa-trash'></i></button>
                </div>
            </div>
        );
    }
}


export default  Todo;
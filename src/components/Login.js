import React from 'react';
import './Login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let username = document.getElementsByClassName('username-input')[0].value;
        let password = document.getElementsByClassName('password-input')[0].value;
        this.props.handleLogin({
            username, password
        })
    }

    render() {
        return (
            <form className = 'login-form'>
                <h1 className = 'login-header'>{this.props.title}</h1>
                <input className = 'username-input' type = 'text' placeholder = 'Username/Email'/>
                <input className = 'password-input' type = 'password' placeholder = 'Password'/>
                <button className = 'button-input' type = 'button' onClick = {this.handleClick}>Login</button>
            </form>
        );
    }
}

export default Login;
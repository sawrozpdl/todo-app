import React from "react";
import "./UserInfo.css";
import { Link } from "react-router-dom";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin() {
    this.props.onLoginClick();
  }

  handleSignup() {
    this.props.onSignupClick();
  }

  handleLogout() {
    this.props.onLogoutClick();
  }

  render() {
    return (
      <div>
        {this.props.user ? (
          <div className="user-info">
            <Link to="/todos">
              <span>{this.props.user}</span>
            </Link>
            <Link to="/">
              <span onClick={this.handleLogout}>Logout</span>
            </Link>
          </div>
        ) : (
          <div className="user-info">
            <Link to="/signup">
              <span onClick={this.handleSignup}>Signup</span>
            </Link>
            <Link to="/login">
              <span onClick={this.handleLogin}>Login</span>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default UserInfo;

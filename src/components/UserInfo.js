import React from "react";
import "./UserInfo.css";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin() {
      this.props.handleLogin();
  }

  handleSignup() {
      this.props.handleSignup();
  }

  handleLogout() {
      this.props.handleLogout();
  }

  render() {
    return (
      <div>
        {this.props.user ? (
          <div className="user-info">
            <span>{this.props.user.username}</span>
            <span onClick={this.handleLogout}>Logout</span>
          </div>
        ) : (
          <div className="user-info">
            <span onClick={this.handleSignup}>Signup</span>
            <span onClick={this.handleLogin}>Login</span>
          </div>
        )}
      </div>
    );
  }
}

export default UserInfo;

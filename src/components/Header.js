import React from "react";
import UserInfo from "./UserInfo";
import { Link } from 'react-router-dom';
import "./Header.css";

class App extends React.Component {
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
      <div className="header">
        <div className="logo">
          <Link to="/">
            <span>{this.props.logoName}</span>
          </Link>
        </div>
        <UserInfo
          user={this.props.user}
          onLoginClick={this.handleLogin}
          onSignupClick={this.handleSignup}
          onLogoutClick={this.handleLogout}
        />
      </div>
    );
  }
}

export default App;

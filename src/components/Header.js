import React from 'react';
import UserInfo from './UserInfo';
import './Header.css';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = 'header'>
        <div className = 'logo'>
        <span>{this.props.logoName}</span>
        </div>
        <UserInfo user = {{username: 'saroj'}}/>
      </div>
    );
  }
}

export default App;

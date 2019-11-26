import React from 'react';
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
      </div>
    );
  }
}

export default App;

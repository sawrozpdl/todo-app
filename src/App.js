import React from 'react';
import TodoArea from './containers/TodoArea';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.data = [
      {
        id : 1,
        content : 'complete this app',
        isDone : false
      },
      {
        id : 2,
        content : 'integrate backend',
        isDone : false
      },
      {
        id : 3,
        content : 'chill out',
        isDone : false
      }
    ];
  }

  render() {
    return (
      <div className = 'App'>
        <TodoArea todos = {this.data}/>
      </div>
    );
  }
}

export default App;

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
        isDone : false,
        editMode:false
      },
      {
        id : 2,
        content : 'integrate backend',
        isDone : false,
        editMode:false
      },
      {
        id : 3,
        content : 'chill out',
        isDone : false,
        editMode:false
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

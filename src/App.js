import React, { Component } from 'react';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Toolbar />
        <MessageList seedMessages={this.props.seedMessages} />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: this.props.seedMessages };
  }

  toggle = message => {
    const index = message.id - 1;
    const messages = this.state.messages;
    messages[index] = message;
    this.setState({ messages });
  };

  toggleSelectAll = () => {
    const messages = this.state.messages
    messages.map(message => {
      message.selected = 'true';
      return message
    });
    this.setState({ messages });
  };

  render() {
    return (
      <div className="App container">
        <Toolbar toggleSelectAll={this.toggleSelectAll} />
        <MessageList messages={this.state.messages} toggle={this.toggle} />
      </div>
    );
  }
}

export default App;

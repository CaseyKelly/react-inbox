import React, { Component } from 'react';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: this.props.seedMessages };
  }

  toggle = toggledMessage => {
    const messages = this.state.messages.slice();
    const index = messages.findIndex(
      message => message.id === toggledMessage.id
    );
    messages[index] = toggledMessage;
    this.setState({ messages });
  };

  toggleSelectAll = () => {
    const messages = this.state.messages.slice();
    const selectedMessages = this.state.messages.filter(
      message => message.selected === true
    );
    let selected;
    selectedMessages.length === this.state.messages.length
      ? (selected = false)
      : (selected = true);
    messages.map(message => {
      message.selected = selected;
      return message;
    });
    this.setState({ messages });
  };

  markAs = e => {
    const readOrUnread = e.target.id === 'read' ? true : false;
    const selectedMessages = this.state.messages.filter(
      message => message.selected === true
    );
    selectedMessages.map(message => (message.read = readOrUnread));
    this.setState({ ...this.state.messages, selectedMessages });
  };

  trashMessage = () => {
    const remainingMessages = this.state.messages.filter(
      message => message.selected !== true
    );
    this.setState({ messages: remainingMessages });
  };

  applyLabel = e => {
    const selectedMessages = this.state.messages.filter(
      message => message.selected === true
    );
    selectedMessages.map(message => {
      return message.labels.push(`${e.target.value}`);
    });
    this.setState({ ...this.state.messages, selectedMessages });
  };

  render() {
    return (
      <div className="App container">
        <Toolbar
          messages={this.state.messages}
          toggleSelectAll={this.toggleSelectAll}
          markAs={this.markAs}
          trashMessage={this.trashMessage}
          applyLabel={this.applyLabel}
        />
        <MessageList messages={this.state.messages} toggle={this.toggle} />
      </div>
    );
  }
}

export default App;

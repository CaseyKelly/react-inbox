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
    const messages = this.state.messages.slice();
    messages[index] = message;
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

  selectAllBtnStyle = () => {
    const selectedMessages = this.state.messages.filter(
      message => message.selected === true
    );

    let btnStyle;
    if (selectedMessages.length === 0) {
      btnStyle = 'fa fa-square-o';
    } else if (
      selectedMessages.length > 0 &&
      selectedMessages.length < this.state.messages.length
    ) {
      btnStyle = 'fa fa-minus-square-o';
    } else if (selectedMessages.length === this.state.messages.length) {
      btnStyle = 'fa fa-check-square-o';
    }
    return btnStyle;
  };

  disabled = () => {
    const selectedMessages = this.state.messages.filter(
      message => message.selected === true
    );
    return selectedMessages.length === 0 ? 'disabled' : '';
  };

  markAs = e => {
    const readOrUnread = e.target.id === 'read' ? true : false;
    const selectedMessages = this.state.messages.filter(
      message => message.selected === true
    );
    selectedMessages.map(message => (message.read = readOrUnread));
    this.setState({ ...this.state.messages, selectedMessages });
  };

  unreadMessageCount = () => {
    const unreadMessages = this.state.messages.filter(
      message => message.read === false
    );
    return unreadMessages.length;
  };

  render() {
    return (
      <div className="App container">
        <Toolbar
          toggleSelectAll={this.toggleSelectAll}
          selectAllBtnStyle={this.selectAllBtnStyle()}
          disabled={this.disabled()}
          markAs={this.markAs}
          unreadMessageCount={this.unreadMessageCount()}
        />
        <MessageList messages={this.state.messages} toggle={this.toggle} />
      </div>
    );
  }
}

export default App;

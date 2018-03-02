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
    messages.map(message => {
      message.selected = true;
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
      btnStyle = 'fa fa-square-o'
    } else if (selectedMessages.length > 0 && selectedMessages.length < this.state.messages.length) {
      btnStyle = 'fa fa-minus-square-o'
    } else if (selectedMessages.length === this.state.messages.length) {
      btnStyle = 'fa fa-check-square-o'
    }
    return btnStyle
  };

  render() {
    return (
      <div className="App container">
        <Toolbar toggleSelectAll={this.toggleSelectAll} selectAllBtnStyle={this.selectAllBtnStyle()} />
        <MessageList messages={this.state.messages} toggle={this.toggle} />
      </div>
    );
  }
}

export default App;

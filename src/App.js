import React, { Component } from 'react';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  state = { messages: [] };

  async componentDidMount() {
    const messagesResponse = await fetch('/api/messages');
    const messagesJson = await messagesResponse.json();
    const messages = messagesJson._embedded.messages;
    this.setState({ messages });
  }

  async toggle(request, toggledMessage) {
    const messages = this.state.messages.slice();
    const index = messages.findIndex(
      message => message.id === toggledMessage.id
    );
    if (request !== false) {
      this.updateStarState(request);
    }
    messages[index] = toggledMessage;
    this.setState({ messages });
  }

  async updateStarState(request) {
    const response = await fetch(`/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    return response;
  }

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
      return message.labels.includes(`${e.target.value}`)
        ? message.labels
        : message.labels.push(`${e.target.value}`);
    });
    e.target.value = 'Apply label';
    this.setState({ ...this.state.messages, selectedMessages });
  };

  removeLabel = e => {
    const selectedMessages = this.state.messages.filter(
      message => message.selected === true
    );
    selectedMessages.map(message => {
      const index = message.labels.indexOf(`${e.target.value}`);
      return message.labels.includes(`${e.target.value}`)
        ? message.labels.splice(index, 1)
        : message.labels;
    });
    e.target.value = 'Remove label';
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
          removeLabel={this.removeLabel}
        />
        <MessageList messages={this.state.messages} toggle={this.toggle} />
      </div>
    );
  }
}

export default App;

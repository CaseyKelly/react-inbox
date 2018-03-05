import React, { Component } from 'react';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import ComposeForm from './components/ComposeForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.trashMessage = this.trashMessage.bind(this);
  }

  state = {
    messages: [],
    showComposeForm: false
  };

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
      this.updateMessage(request);
    }
    messages[index] = toggledMessage;
    this.setState({ messages });
  }

  async updateMessage(request) {
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

  getSelectedMessages = () => {
    return this.state.messages.filter(message => message.selected === true);
  };

  toggleSelectAll = () => {
    const messages = this.state.messages.slice();
    const selectedMessages = this.getSelectedMessages();
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
    const selectedMessages = this.getSelectedMessages();
    const request = {
      messageIds: selectedMessages.map(message => message.id),
      command: 'read',
      read: readOrUnread
    };
    selectedMessages.map(message => (message.read = readOrUnread));
    this.updateMessage(request);
    this.setState({ ...this.state.messages, selectedMessages });
  };

  trashMessage() {
    const selectedMessages = this.getSelectedMessages();
    const remainingMessages = this.state.messages.filter(
      message => message.selected !== true
    );
    const request = {
      messageIds: selectedMessages.map(message => message.id),
      command: 'delete'
    };
    this.updateMessage(request);
    this.setState({ messages: remainingMessages });
  }

  applyLabel = e => {
    const selectedMessages = this.getSelectedMessages();
    selectedMessages.map(message => {
      return message.labels.includes(`${e.target.value}`)
        ? message.labels
        : message.labels.push(`${e.target.value}`);
    });
    this.makeLabelRequest('addLabel', selectedMessages, e);
    e.target.value = 'Apply label';
    this.setState({ ...this.state.messages, selectedMessages });
  };

  removeLabel = e => {
    const selectedMessages = this.getSelectedMessages();
    selectedMessages.map(message => {
      const index = message.labels.indexOf(`${e.target.value}`);
      return message.labels.includes(`${e.target.value}`)
        ? message.labels.splice(index, 1)
        : message.labels;
    });
    this.makeLabelRequest('removeLabel', selectedMessages, e);
    e.target.value = 'Remove label';
    this.setState({ ...this.state.messages, selectedMessages });
  };

  makeLabelRequest = (addOrRemoveLabel, selectedMessages, e) => {
    const request = {
      messageIds: selectedMessages.map(message => message.id),
      command: addOrRemoveLabel,
      label: `${e.target.value}`
    };
    this.updateMessage(request);
  };

  toggleComposeForm = () => {
    const toggle = !this.state.showComposeForm
    this.setState({ showComposeForm: toggle });
  }

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
          toggleComposeForm={this.toggleComposeForm}
        />
        {this.state.showComposeForm ? <ComposeForm /> : <div />}
        <MessageList messages={this.state.messages} toggle={this.toggle} />
      </div>
    );
  }
}

export default App;

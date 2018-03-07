import React from 'react';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import ComposeForm from './components/ComposeForm';
import { connect } from 'react-redux';
import { toggleComposeForm } from './actions'

const App = ({ messages, showComposeForm, toggleComposeForm }) =>
  messages.length ? (
    <div className="App container">
      <Toolbar
        messages={messages}
        toggleSelectAll={this.toggleSelectAll}
        markAs={this.markAs}
        trashMessage={this.trashMessage}
        applyLabel={this.applyLabel}
        removeLabel={this.removeLabel}
        toggleComposeForm={toggleComposeForm}
      />
      {showComposeForm ? (
        <ComposeForm createMessage={this.createMessage} />
      ) : (
        <div />
      )}
      <MessageList messages={messages} toggle={this.toggle} />
    </div>
  ) : (
    <div>Loading...</div>
  );

const mapStateToProps = ({ messages, showComposeForm }) => ({
  messages: messages.all,
  showComposeForm,
});

const mapDispatchToProps = dispatch => ({
  toggleComposeForm: () => dispatch(toggleComposeForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// state = {
//   messages: [],
//   showComposeForm: false
// };

// async componentDidMount() {
//   const messagesResponse = await fetch('/api/messages');
//   const messagesJson = await messagesResponse.json();
//   const messages = messagesJson._embedded.messages;
//   this.setState({ messages });
// }

// async toggle(request, toggledMessage) {
//   const messages = this.state.messages.slice();
//   const index = messages.findIndex(
//     message => message.id === toggledMessage.id
//   );
//   if (request !== false) {
//     this.updateMessage(request);
//   }
//   messages[index] = toggledMessage;
//   this.setState({ messages });
// }

// async createMessage(message) {
//   const response = await fetch(`/api/messages`, {
//     method: 'POST',
//     body: JSON.stringify(message),
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json'
//     }
//   });
//   const messagesResponse = await fetch('/api/messages');
//   const messagesJson = await messagesResponse.json();
//   const messages = messagesJson._embedded.messages;
//   this.setState({ messages, showComposeForm: false });
//   return response;
// }

// async updateMessage(request) {
//   const response = await fetch(`/api/messages`, {
//     method: 'PATCH',
//     body: JSON.stringify(request),
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json'
//     }
//   });
//   return response;
// }

// getSelectedMessages = () => {
//   return this.state.messages.filter(message => message.selected === true);
// };

// toggleSelectAll = () => {
//   const messages = this.state.messages.slice();
//   const selectedMessages = this.getSelectedMessages();
//   let selected;
//   selectedMessages.length === this.state.messages.length
//     ? (selected = false)
//     : (selected = true);
//   messages.map(message => {
//     message.selected = selected;
//     return message;
//   });
//   this.setState({ messages });
// };

// markAs = e => {
//   const readOrUnread = e.target.id === 'read' ? true : false;
//   const selectedMessages = this.getSelectedMessages();
//   const request = {
//     messageIds: selectedMessages.map(message => message.id),
//     command: 'read',
//     read: readOrUnread
//   };
//   selectedMessages.map(message => (message.read = readOrUnread));
//   this.updateMessage(request);
//   this.setState({ ...this.state.messages, selectedMessages });
// };

// trashMessage() {
//   const selectedMessages = this.getSelectedMessages();
//   const remainingMessages = this.state.messages.filter(
//     message => message.selected !== true
//   );
//   const request = {
//     messageIds: selectedMessages.map(message => message.id),
//     command: 'delete'
//   };
//   this.updateMessage(request);
//   this.setState({ messages: remainingMessages });
// }

// applyLabel = e => {
//   const selectedMessages = this.getSelectedMessages();
//   selectedMessages.map(message => {
//     return message.labels.includes(`${e.target.value}`)
//       ? message.labels
//       : message.labels.push(`${e.target.value}`);
//   });
//   this.makeLabelRequest('addLabel', selectedMessages, e);
//   e.target.value = 'Apply label';
//   this.setState({ ...this.state.messages, selectedMessages });
// };

// removeLabel = e => {
//   const selectedMessages = this.getSelectedMessages();
//   selectedMessages.map(message => {
//     const index = message.labels.indexOf(`${e.target.value}`);
//     return message.labels.includes(`${e.target.value}`)
//       ? message.labels.splice(index, 1)
//       : message.labels;
//   });
//   this.makeLabelRequest('removeLabel', selectedMessages, e);
//   e.target.value = 'Remove label';
//   this.setState({ ...this.state.messages, selectedMessages });
// };

// makeLabelRequest = (addOrRemoveLabel, selectedMessages, e) => {
//   const request = {
//     messageIds: selectedMessages.map(message => message.id),
//     command: addOrRemoveLabel,
//     label: `${e.target.value}`
//   };
//   this.updateMessage(request);
// };
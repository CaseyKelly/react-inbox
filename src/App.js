import React from 'react';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import ComposeForm from './components/ComposeForm';
import { connect } from 'react-redux';
import {
  toggleComposeForm,
  createMessage,
  toggleSelectAll,
  markAsRead,
  markAsUnread,
  addLabel,
  removeLabel
} from './actions';

const App = ({
  messages,
  showComposeForm,
  toggleComposeForm,
  createMessage,
  toggleSelectAll,
  markAsRead,
  markAsUnread,
  addLabel,
  removeLabel
}) =>
  messages.length ? (
    <div className="App container">
      <Toolbar
        messages={messages}
        toggleSelectAll={toggleSelectAll}
        markAsRead={markAsRead}
        markAsUnread={markAsUnread}
        trashMessage={this.trashMessage}
        addLabel={addLabel}
        removeLabel={removeLabel}
        toggleComposeForm={toggleComposeForm}
      />
      {showComposeForm ? (
        <ComposeForm
          createMessage={createMessage}
          toggleComposeForm={toggleComposeForm}
        />
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
  showComposeForm
});

const mapDispatchToProps = dispatch => ({
  toggleComposeForm: () => dispatch(toggleComposeForm()),
  createMessage: message => dispatch(createMessage(message)),
  toggleSelectAll: messages => dispatch(toggleSelectAll(messages)),
  markAsRead: messages => dispatch(markAsRead(messages)),
  markAsUnread: messages => dispatch(markAsUnread(messages)),
  addLabel: (messages, label) => dispatch(addLabel(messages, label)),
  removeLabel: (messages, label) => dispatch(removeLabel(messages, label))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

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

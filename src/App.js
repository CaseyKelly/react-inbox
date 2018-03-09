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
  removeLabel,
  toggleSelectMessage,
  toggleMessageStar
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
  removeLabel,
  toggleSelectMessage,
  toggleMessageStar
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
      <MessageList
        messages={messages}
        toggleSelectMessage={toggleSelectMessage}
        toggleMessageStar={toggleMessageStar}
      />
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
  toggleSelectAll: prevMessages => dispatch(toggleSelectAll(prevMessages)),
  markAsRead: prevSelectedMessages =>
    dispatch(markAsRead(prevSelectedMessages)),
  markAsUnread: prevSelectedMessages =>
    dispatch(markAsUnread(prevSelectedMessages)),
  addLabel: (prevSelectedMessages, label) =>
    dispatch(addLabel(prevSelectedMessages, label)),
  removeLabel: (prevSelectedMessages, label) =>
    dispatch(removeLabel(prevSelectedMessages, label)),
  toggleSelectMessage: (prevMessages, toggledMessage) =>
    dispatch(toggleSelectMessage(prevMessages, toggledMessage)),
  toggleMessageStar: (prevMessages, toggledMessage, request) =>
    dispatch(toggleMessageStar(prevMessages, toggledMessage, request))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

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

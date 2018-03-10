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
  toggleMessageStar,
  trashMessage
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
  toggleMessageStar,
  trashMessage
}) =>
  messages.length ? (
    <div className="App container">
      <Toolbar
        messages={messages}
        toggleSelectAll={toggleSelectAll}
        markAsRead={markAsRead}
        markAsUnread={markAsUnread}
        trashMessage={trashMessage}
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
  markAsRead: prevMessages => dispatch(markAsRead(prevMessages)),
  markAsUnread: prevMessages => dispatch(markAsUnread(prevMessages)),
  addLabel: (prevMessages, label) => dispatch(addLabel(prevMessages, label)),
  removeLabel: (prevMessages, label) =>
    dispatch(removeLabel(prevMessages, label)),
  toggleSelectMessage: (prevMessages, toggledMessage) =>
    dispatch(toggleSelectMessage(prevMessages, toggledMessage)),
  toggleMessageStar: (prevMessages, toggledMessage, request) =>
    dispatch(toggleMessageStar(prevMessages, toggledMessage, request)),
  trashMessage: prevMessages => dispatch(trashMessage(prevMessages))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

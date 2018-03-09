import React from 'react';
import Message from './Message';

const MessageList = ({ messages, toggleSelectMessage, toggleMessageStar }) => {
  const guid = () => {
    return Math.random()
      .toString(36)
      .substring(2, 15);
  };

  return (
    <div>
      {messages.map(({ id, subject, read, selected, labels, starred }) => (
        <Message
          key={id + guid()}
          id={id}
          subject={subject}
          read={read}
          selected={selected}
          labels={labels}
          starred={starred}
          toggleSelectMessage={toggleSelectMessage}
          toggleMessageStar={toggleMessageStar}
          messages={messages}
        />
      ))}
    </div>
  );
};

export default MessageList;

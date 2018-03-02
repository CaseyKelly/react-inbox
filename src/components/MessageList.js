import React from 'react';
import Message from './Message';

const MessageList = ({ messages, toggle }) => {
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
          toggle={toggle}
        />
      ))}
    </div>
  );
};

export default MessageList;

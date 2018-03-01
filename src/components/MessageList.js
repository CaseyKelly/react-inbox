import React, { Component } from 'react';
import Message from './Message';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = { messages: this.props.seedMessages };
    console.log(this.state);
  }

  render() {
    return (
      <div>
        {this.state.messages.map(({ id, subject, read}) => (
          <Message key={id} subject={subject} read={read} />
        ))}
      </div>
    );
  }
}

export default MessageList;

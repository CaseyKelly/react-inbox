import React, { Component } from 'react';
import Message from './Message';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = { messages: this.props.seedMessages };
  }

  render() {
    return (
      <div>
        {this.state.messages.map(
          ({ id, subject, read, selected, labels, starred }) => (
            <Message
              key={id}
              subject={subject}
              read={read}
              selected={selected}
              labels={labels}
              starred={starred}
            />
          )
        )}
      </div>
    );
  }
}

export default MessageList;

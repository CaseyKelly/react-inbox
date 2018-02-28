import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = { messages: this.props.seedMessages };
    console.log(this.state)
  }

  render() {
    return (
      <ul>
        {this.state.messages.map(message => <li key={message.id}>{message.subject}</li>)}
      </ul>
    );
  }
}

export default MessageList;

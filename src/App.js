import React, { Component } from "react";
import MessageList from "./components/MessageList";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <MessageList seedMessages={this.props.seedMessages} />
      </div>
    );
  }
}

export default App;

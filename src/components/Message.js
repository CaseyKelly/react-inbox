import React, { Component } from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readStyle: this.props.read ? ' read' : ' unread',
      selectedStyle: this.props.selected ? ' selected' : '',
      checkboxStyle: this.props.selected ? ' checked' : '',
      starStyle: this.props.starred ? 'star fa fa-star' : 'star fa fa-star-o'
    };
  }

  toggleStarred = () => {
    const toggleStyle =
      this.state.starStyle === 'star fa fa-star'
        ? 'star fa fa-star-o'
        : 'star fa fa-star';
    this.setState({ starStyle: toggleStyle });
  };

  toggleSelected = () => {
    const toggleStyle = this.state.selectedStyle === ' selected'
      ? ''
      : ' selected';
    this.setState({ selectedStyle: toggleStyle })
  }

  render() {
    return (
      <div className={'row message' + this.state.readStyle + this.state.selectedStyle}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input
                type="checkbox"
                defaultChecked={this.state.checkboxStyle}
                onClick={this.toggleSelected}
              />
            </div>
            <div className="col-xs-2">
              <i
                className={this.state.starStyle}
                onClick={this.toggleStarred}
              />
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {this.props.labels.map(label => (
            <span key={label} className="label label-warning">
              {label}
            </span>
          ))}
          <a href="/">{this.props.subject}</a>
        </div>
      </div>
    );
  }
}

export default Message;

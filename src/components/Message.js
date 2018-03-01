import React from 'react';

const Message = ({ subject, read, selected }) => {
  const messageStyle = `row message ${read ? 'read' : 'unread'} ${
    selected ? 'selected' : ''
  }`;
  return (
    <div className={messageStyle}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" defaultChecked={selected ? 'checked' : ''} />
          </div>
          <div className="col-xs-2">
            <i className="star fa fa-star-o" />
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <a href="#">{subject}</a>
      </div>
    </div>
  );
};

export default Message;

import React from 'react';

const Message = ({ subject, read, selected, labels, starred }) => {
  const messageStyle = `row message ${read ? 'read' : 'unread'} ${
    selected ? 'selected' : ''
  }`;
  const checkboxStyle = selected ? 'checked' : '';
  const starStyle = starred ? 'star fa fa-star' : 'star fa fa-star-o';

  return (
    <div className={messageStyle}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" defaultChecked={checkboxStyle} />
          </div>
          <div className="col-xs-2">
            <i className={starStyle} />
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {labels.map(label => (
          <span key={label} className="label label-warning">
            {label}
          </span>
        ))}
        <a href="#">{subject}</a>
      </div>
    </div>
  );
};

export default Message;

import React from 'react';

const Message = ({ subject, read }) => {
  const status = read ? 'row message read' : 'row message unread';
  return (
    <div className={status}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
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

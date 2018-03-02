import React from 'react';

const Message = ({
  starred,
  selected,
  read,
  labels,
  subject,
  toggle,
  id
}) => {
  const readStyle = read ? ' read' : ' unread';
  const selectedStyle = selected ? ' selected' : '';
  const checkboxStyle = selected ? ' checked' : '';
  const starStyle = starred ? 'star fa fa-star' : 'star fa fa-star-o';

  const handleStarred = e => {
    const message = {
      id: id,
      subject: subject,
      read: read,
      starred: !starred,
      labels: labels,
      selected: selected
    };
    toggle(message);
  };

  const handleChecked = e => {
    const message = {
      id: id,
      subject: subject,
      read: read,
      starred: starred,
      labels: labels,
      selected: !selected,
    };
    toggle(message);
  };

  return (
    <div className={'row message' + readStyle + selectedStyle}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input
              type="checkbox"
              defaultChecked={checkboxStyle}
              onClick={handleChecked}
            />
          </div>
          <div className="col-xs-2">
            <i className={starStyle} onClick={handleStarred} />
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {labels.map(label => (
          <span key={label} className="label label-warning">
            {label}
          </span>
        ))}
        <a href="/">{subject}</a>
      </div>
    </div>
  );
};

export default Message;

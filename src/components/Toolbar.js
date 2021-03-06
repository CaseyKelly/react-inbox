import React from 'react';

const Toolbar = ({
  toggleSelectAll,
  selectAllBtnStyle,
  disabled,
  markAsRead,
  markAsUnread,
  unreadMessageCount,
  trashMessage,
  addLabel,
  removeLabel,
  toggleComposeForm,
  messages
}) => {
  const selectedMessages = messages.filter(
    message => message.selected === true
  );
  const unreadMessages = messages.filter(message => message.read === false);

  const handleSelectAll = e => {
    e.preventDefault();
    toggleSelectAll(messages);
  };

  const handleMarkAs = e => {
    e.preventDefault();
    e.target.id === 'read' ? markAsRead(messages) : markAsUnread(messages);
  };

  const handleAddLabel = e => {
    e.preventDefault();
    addLabel(messages, e.target.value);
    e.target.value = 'Apply label';
  };

  const handleRemoveLabel = e => {
    e.preventDefault();
    removeLabel(messages, e.target.value);
    e.target.value = 'Remove label';
  };

  const handleTrashMessage = e => {
    e.preventDefault();
    trashMessage(messages);
  };

  selectAllBtnStyle = () => {
    let btnStyle;
    if (selectedMessages.length === 0) {
      btnStyle = 'fa fa-square-o';
    } else if (
      selectedMessages.length > 0 &&
      selectedMessages.length < messages.length
    ) {
      btnStyle = 'fa fa-minus-square-o';
    } else if (selectedMessages.length === messages.length) {
      btnStyle = 'fa fa-check-square-o';
    }
    return btnStyle;
  };

  disabled = () => {
    return selectedMessages.length === 0 ? 'disabled' : '';
  };

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadMessages.length}</span>
          {unreadMessages.length === 1 ? 'unread message' : 'unread messages'}
        </p>

        <a className="btn btn-danger" onClick={toggleComposeForm}>
          <i className="fa fa-plus" />
        </a>

        <button className="btn btn-default" onClick={handleSelectAll}>
          <i className={selectAllBtnStyle()} />
        </button>

        <button
          id="read"
          className="btn btn-default"
          disabled={disabled()}
          onClick={handleMarkAs}
        >
          Mark As Read
        </button>

        <button
          id="unread"
          className="btn btn-default"
          disabled={disabled()}
          onClick={handleMarkAs}
        >
          Mark As Unread
        </button>

        <select
          className="form-control label-select"
          disabled={disabled()}
          onChange={handleAddLabel}
        >
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select
          className="form-control label-select"
          disabled={disabled()}
          onChange={handleRemoveLabel}
        >
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button
          className="btn btn-default"
          disabled={disabled()}
          onClick={handleTrashMessage}
        >
          <i className="fa fa-trash-o" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;

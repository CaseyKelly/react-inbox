import React from 'react';

const Toolbar = ({
  toggleSelectAll,
  selectAllBtnStyle,
  disabled,
  markAs,
  unreadMessageCount
}) => {
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadMessageCount}</span>
          {unreadMessageCount === 1 ? 'unread message' : 'unread messages'}
        </p>

        <button className="btn btn-default" onClick={toggleSelectAll}>
          <i className={selectAllBtnStyle} />
        </button>

        <button
          id="read"
          className="btn btn-default"
          disabled={disabled}
          onClick={markAs}
        >
          Mark As Read
        </button>

        <button
          id="unread"
          className="btn btn-default"
          disabled={disabled}
          onClick={markAs}
        >
          Mark As Unread
        </button>

        <select className="form-control label-select" disabled={disabled}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled={disabled}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" disabled={disabled}>
          <i className="fa fa-trash-o" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;

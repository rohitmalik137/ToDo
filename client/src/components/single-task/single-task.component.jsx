import React from 'react';

import './single-task.styles.scss';

const SingleTask = (props) => (
  <div className="single-task">
    <div className="left">
      <div
        className={`${props.isComplete ? 'isComplete' : ''} icon complete `}
        onClick={props.onUpdateComplete}
      >
        <span className="tick">&#10003;</span>
      </div>
      <div className={`${props.isComplete ? 'completed' : ''}`}>
        {props.task}
      </div>
    </div>
    <div className="right">
      <div onClick={props.onDelete}>
        <i className="fa fa-trash icon" aria-hidden="true"></i>
      </div>
      <div onClick={props.onUpdateImportant}>
        <i
          className={`${props.isImportant ? 'important' : ''} icon fa fa-star `}
          aria-hidden="true"
        ></i>
      </div>
    </div>
  </div>
);

export default SingleTask;

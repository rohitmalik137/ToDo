import React from 'react';

import './tasks-wrapper.styles.scss';
import TaskSubmitForm from '../task-submit-form/task-submit-form.component';
import Tasks from '../tasks/tasks.component';

const TasksWrapper = ({ title, open }) => (
  <div className="wrapper">
    <p className="heading">{title} ...</p>
    {title !== 'assigned_to_me' ? <TaskSubmitForm /> : ''}
    <Tasks subTitle={title} open={open} />
  </div>
);

export default TasksWrapper;

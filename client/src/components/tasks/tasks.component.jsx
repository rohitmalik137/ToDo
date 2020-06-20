import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './tasks.styles.scss';
import {
  getTasks,
  deleteTask,
  isComplete,
  isImportant,
} from '../../redux/actions/taskActions';
import SingleTask from '../single-task/single-task.component';

class Tasks extends Component {
  componentDidMount() {
    // this.getTasks();
    this.props.getTasks();
  }

  updateCompletePostHandler = (taskId) => {
    this.props.isComplete(taskId);
  };

  updateImportantPostHandler = (taskId) => {
    this.props.isImportant(taskId);
  };

  deletePostHandler = (taskId) => {
    this.props.deleteTask(taskId);
  };

  render() {
    const { tasks } = this.props.task;
    return (
      <div>
        {tasks.map((task) => {
          if (!task.completed) {
            return (
              <SingleTask
                key={task._id}
                task={task.task}
                myKey={task._id}
                onDelete={this.deletePostHandler.bind(this, task._id)}
                onUpdateImportant={this.updateImportantPostHandler.bind(
                  this,
                  task._id
                )}
                onUpdateComplete={this.updateCompletePostHandler.bind(
                  this,
                  task._id
                )}
                isImportant={task.important}
              />
            );
          }
        })}
        <h2>Completed!</h2>
        {tasks.map((task) => {
          // console.log(task);
          if (task.completed) {
            return (
              <SingleTask
                key={task._id}
                task={task.task}
                onDelete={this.deletePostHandler.bind(this, task._id)}
                onUpdateImportant={this.updateImportantPostHandler.bind(
                  this,
                  task._id
                )}
                onUpdateComplete={this.updateCompletePostHandler.bind(
                  this,
                  task._id
                )}
                isImportant={task.important}
                isComplete={task.completed}
              />
            );
          }
        })}
      </div>
    );
  }
}

Tasks.propTypes = {
  getTasks: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  isComplete: PropTypes.func.isRequired,
  isImportant: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  task: state.task,
});

export default connect(mapStateToProps, {
  getTasks,
  deleteTask,
  isComplete,
  isImportant,
})(Tasks);

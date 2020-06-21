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
import BackgroundIcon from '../background-icon/background-icon.component';

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completeToggle: true,
    };
  }

  componentDidMount() {
    // this.getTasks();
    this.props.getTasks();
  }

  completeToggle = () => {
    this.setState({
      completeToggle: !this.state.completeToggle,
    });
  };

  updateCompletePostHandler = (taskId) => {
    this.props.isComplete(taskId);
  };

  updateImportantPostHandler = (taskId) => {
    this.props.isImportant(taskId);
  };

  deletePostHandler = (taskId) => {
    this.props.deleteTask(taskId);
  };

  conditional(args, tasks) {
    switch (args) {
      case 'important':
        return this.state.completeToggle
          ? tasks.map((task) => {
              // console.log(task);
              if (task.important) {
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
            })
          : '';
      // case 'myday':
      //   return (

      //   )
      case 'assigned_to_me':
        return (
          <div className={`${this.props.open ? 'opened' : ''}`}>
            <BackgroundIcon />
            <p className="assigned_text">
              Tasks assigned to you will appear here
            </p>
          </div>
        );
      case 'inbox':
      default:
        return tasks.map((task) => {
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
        });
    }
  }

  render() {
    const { tasks } = this.props.task;
    return (
      <div>
        {this.conditional(this.props.subTitle, tasks)}

        {this.props.subTitle === 'inbox' || this.props.subTitle === 'tasks' ? (
          <p onClick={this.completeToggle} className="headings">
            {this.state.completeToggle ? (
              <i className="fa fa-chevron-down" aria-hidden="true"></i>
            ) : (
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            )}
            Completed!
          </p>
        ) : (
          ''
        )}
        {this.props.subTitle === 'inbox' || this.props.subTitle === 'tasks'
          ? this.state.completeToggle
            ? tasks.map((task) => {
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
              })
            : ''
          : ''}
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

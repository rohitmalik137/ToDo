import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./tasks.styles.scss";
import { getTasks, deleteTask } from "../../redux/actions/taskActions";
import SingleTask from "../single-task/single-task.component";

class Tasks extends Component {
  componentDidMount() {
    // this.getTasks();
    this.props.getTasks();
  }

  updateCompletePostHandler = (taskId) => {
    //     const cmplt = this.state.tasks.filter(task => {
    //         if(task._id === taskId){
    //             return task.task
    //         }
    //     })
    //     fetch('http://localhost:8080/todo/task-complete/' + taskId, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         completed: !cmplt[0].completed
    //       })
    //     })
    //     .then(res => {
    //         if (res.status === 422) {
    //             throw new Error(
    //             "Validation failed."
    //             );
    //         }
    //         if (res.status !== 200 && res.status !== 201) {
    //             console.log('Error!');
    //             throw new Error('Updating failed!');
    //         }
    //         return res.json();
    //     })
    //     .then(resData => {
    //         console.log(resData);
    //         this.setState({ completed: resData.task.completed });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
  };

  updateImportantPostHandler = (taskId) => {
    //     const cmplt = this.state.tasks.filter(task => {
    //         if(task._id === taskId){
    //             return task.task
    //         }
    //     })
    //     fetch('http://localhost:8080/todo/task-important/' + taskId, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         important: !cmplt[0].important
    //       })
    //     })
    //     .then(res => {
    //         if (res.status === 422) {
    //             throw new Error(
    //             "Validation failed."
    //             );
    //         }
    //         if (res.status !== 200 && res.status !== 201) {
    //             console.log('Error!');
    //             throw new Error('Updating failed!');
    //         }
    //         return res.json();
    //     })
    //     .then(resData => {
    //         console.log(resData);
    //         this.setState({ important: !this.state.important });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
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
};

const mapStateToProps = (state) => ({
  task: state.task,
});

export default connect(mapStateToProps, { getTasks, deleteTask })(Tasks);

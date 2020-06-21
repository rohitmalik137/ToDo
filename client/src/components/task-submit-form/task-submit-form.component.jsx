import React, { Component } from 'react';
import { connect } from 'react-redux';

import './task-submit-form.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { addTask } from '../../redux/actions/taskActions.ts';

class TaskSubmitForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: '',
      important: false,
      completed: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const newTask = {
      task: this.state.task,
      important: this.state.important,
      completed: this.state.completed,
    };

    this.props.addTask(newTask);
    this.setState({
      task: '',
      important: false,
      completed: false,
    });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormInput
          name="task"
          type="text"
          label="Add a task"
          fullWidth="yes"
          handleChange={this.handleChange}
          value={this.state.task}
          required
        />
        <div className="buttons">
          <CustomButton type="submit"> ADD </CustomButton>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  task: state.task,
});

export default connect(mapStateToProps, { addTask })(TaskSubmitForm);

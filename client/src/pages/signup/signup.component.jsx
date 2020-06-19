import React from 'react';
// import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './signup.styles.scss';
import logo from '../../assets/logo.png';
import Image from '../../components/image/image.component';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { register } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';

class Signup extends React.Component {
  state = {
    email: '',
    password: '',
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onSignup = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    //create user object
    const newUser = {
      email,
      password,
    };
    // Attempt to register
    this.props.register(newUser);
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in__wrapper">
        <div className="sign-in">
          <div>
            {' '}
            <Image logo={logo} isLogo="yes" />{' '}
          </div>
          {this.state.msg ? (
            <div className="error">{this.state.msg}</div>
          ) : null}
          <form onSubmit={this.onSignup}>
            <FormInput
              name="email"
              type="email"
              label="email"
              handleChange={this.handleChange}
              value={this.state.email}
            />
            <FormInput
              name="password"
              type="password"
              label="password"
              handleChange={this.handleChange}
              value={this.state.password}
            />
            <div className="buttons">
              <CustomButton type="submit"> Signup </CustomButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(Signup);

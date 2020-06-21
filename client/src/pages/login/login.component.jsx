import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './login.styles.scss';
import logo from '../../assets/logo.png';
import Image from '../../components/image/image.component';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { login } from '../../redux/actions/authActions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };

    //Attempt to login
    this.props.login(user);
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
            <Image logo={logo} isLogo="yes" />
          </div>
          {this.state.msg ? (
            <div className="error">{this.state.msg}</div>
          ) : null}
          <form onSubmit={this.handleSubmit}>
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
            <p className="anchor__wrapper">
              No account?{' '}
              <Link to="/signup" className="anchor">
                Create One!
              </Link>{' '}
            </p>
            <div className="buttons">
              <CustomButton type="submit"> LOGIN </CustomButton>
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

export default connect(mapStateToProps, { login })(Login);

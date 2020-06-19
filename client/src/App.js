import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadUser } from './redux/actions/authActions';
import WelcomePage from './pages/welcome/welcome.component';
import LoginPage from './pages/login/login.component';
import SignupPage from './pages/signup/signup.component';
import HomePage from './pages/homepage/homepage.component';
import store from './redux/store.ts';
import './App.css';

class App extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    let routes = (
      <div className="App">
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <div className="App">
          <Switch>
            <Route exact path="/tasks" component={HomePage} />
            <Route exact path="/tasks/:navigate" component={HomePage} />
            <Redirect to="/tasks" />
          </Switch>
        </div>
      );
    }
    return <Fragment>{routes}</Fragment>;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);

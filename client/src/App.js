import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

import WelcomePage from "./pages/welcome/welcome.component";
import LoginPage from "./pages/login/login.component";
import SignupPage from "./pages/signup/signup.component";
import HomePage from "./pages/homepage/homepage.component";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route path="/tasks" component={HomePage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './left-navigation.styles.scss';
import LeftNavigationLinks from '../left-navigation-links/left-navigation-links.component';

class LeftNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div className="main__wrapper">
        <div className="left-navigation-links__wrapper">
          <Link to="/tasks/myday" style={{ textDecoration: 'none' }}>
            <LeftNavigationLinks
              icon="fa fa-sun-o"
              text="My Day"
              isOpen={this.props.isOpen}
            />
          </Link>
        </div>
        <div className="left-navigation-links__wrapper">
          <Link to="/tasks/important" style={{ textDecoration: 'none' }}>
            <LeftNavigationLinks
              icon="fa fa-star"
              text="Important"
              isOpen={this.props.isOpen}
            />
          </Link>
        </div>
        <div className="left-navigation-links__wrapper">
          <Link to="/tasks/planned" style={{ textDecoration: 'none' }}>
            <LeftNavigationLinks
              icon="fa fa-calendar"
              text="Planned"
              isOpen={this.props.isOpen}
            />
          </Link>
        </div>
        <div className="left-navigation-links__wrapper">
          <Link to="/tasks/assigned_to_me" style={{ textDecoration: 'none' }}>
            <LeftNavigationLinks
              icon="fa fa-user"
              text="Assigned to you"
              isOpen={this.props.isOpen}
            />
          </Link>
        </div>
        <div className="left-navigation-links__wrapper">
          <Link to="/tasks/inbox" style={{ textDecoration: 'none' }}>
            <LeftNavigationLinks
              icon="fa fa-home"
              text="Tasks"
              isOpen={this.props.isOpen}
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default LeftNavigation;

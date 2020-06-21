import React, { Component } from 'react';

import './homepage.styles.scss';
import SearchBox from '../../components/search-box/search-box.component';
import LeftNavigation from '../../components/left-navigation/left-navigation.component';
import TasksWrapper from '../../components/tasks-wrapper/tasks-wrapper.component';
import Image from '../../components/image/image.component';
import profile from '../../assets/profile.png';
import ProfileDropdown from '../../components/profile-dropdown/profile-dropdown.component';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchField: '',
      open: false,
      hideNshow: false,
    };
  }

  renderSwitch(args) {
    switch (args) {
      case 'inbox':
        return <TasksWrapper />;
      case 'myday':
        return 'myday';
      case 'important':
        return 'important';
      case 'planned':
        return 'planned';
      case 'assigned_to_me':
        return 'assigned_to_me';
      default:
        return <TasksWrapper />;
    }
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  hideNshow = () => {
    this.setState({
      hideNshow: !this.state.hideNshow,
    });
  };

  toggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    return (
      <div className="homepage">
        {/* Header */}
        <header className="header">
          <div>To Do</div>
          <div>
            <SearchBox placeholder="Search" handleChange={this.handleChange} />
          </div>
          <div className="profile" onClick={this.hideNshow}>
            <Image logo={profile} miniProfile="yes" profilee="yes" />
          </div>
          {this.state.hideNshow ? <ProfileDropdown /> : ''}
        </header>

        {/* left navigation */}
        <div className={`${!this.state.open ? 'open' : ''} leftNavigation`}>
          <div onClick={this.toggle} className="toggler">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
          <LeftNavigation isOpen={this.state.open} />
        </div>

        {/* main content */}
        <div className="main">
          <div
            className={`${!this.state.open ? 'main__open' : ''} main__content`}
          >
            {this.renderSwitch(
              window.location.href.split('/')[
                window.location.href.split('/').length - 1
              ]
            )}
          </div>
        </div>

        {/* task description */}
        {/* <div className="task-description">kjnkjnk</div> */}
      </div>
    );
  }
}

export default HomePage;

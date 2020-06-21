import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './welcome.styles.scss';
import left from '../../assets/welcome-left.png';
import right from '../../assets/welcome-right.png';
import center from '../../assets/welcome-center.png';
import logo from '../../assets/logo.png';
import Image from '../../components/image/image.component';
import CustomButton from '../../components/custom-button/custom-button.component';

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    this.setState({ windowWidth });
  }

  renderView(args) {
    switch (args) {
      case 'smaller':
        return (
          <div className="welcome-page">
            <div className="middle">
              <div>
                {' '}
                <Image logo={logo} isLogo="yes" />{' '}
              </div>
              <h1>Microsoft To Do</h1>
              <Image logo={center} centered="yes" />
              <div className="btn">
                <Link to="/login">
                  <CustomButton>Get Started</CustomButton>
                </Link>
              </div>
            </div>
          </div>
        );
      case 'bigger':
      default:
        return (
          <div className="welcome-page">
            {' '}
            <div>
              {' '}
              <Image logo={left} />{' '}
            </div>
            <div className="middle">
              <div>
                {' '}
                <Image logo={logo} isLogo="yes" />{' '}
              </div>
              <h1>Microsoft To Do</h1>
              <p>To Do gives you focus, from work to play.</p>
              <div className="btn">
                <Link to="/login">
                  <CustomButton>Get Started</CustomButton>
                </Link>
              </div>
            </div>
            <div>
              {' '}
              <Image logo={right} />{' '}
            </div>{' '}
          </div>
        );
    }
  }

  render() {
    // console.log(this.state.windowWidth < 800);
    return (
      <div>
        {this.state.windowWidth >= 800
          ? this.renderView('bigger')
          : this.renderView('smaller')}
      </div>
    );
  }
}

export default WelcomePage;

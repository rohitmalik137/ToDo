import React from 'react';

import { ReactComponent as ZeroIndex } from '../../assets/inbox-zero.svg';

import './background-icon.styles.scss';

const BackgroundIcon = () => (
  <div className="background-icon__wrapper">
    <ZeroIndex className="background-icon" />
  </div>
);

export default BackgroundIcon;

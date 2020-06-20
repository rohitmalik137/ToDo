import React from 'react';

import './left-navigation-links.styles.scss';

const LeftNavigationLinks = ({ icon, text, isOpen }) => (
  <div className="leftnavigationlink">
    <div className="icon">
      <i className={icon} aria-hidden="true"></i>
    </div>
    {isOpen ? <div className="text">{text}</div> : ''}
  </div>
);

export default LeftNavigationLinks;

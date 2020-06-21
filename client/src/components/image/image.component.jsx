import React from 'react';

import './image.styles.scss';

const Image = ({ logo, isLogo, profilee, miniProfile, centered }) => (
  <div className="image__wrapper">
    <img
      src={logo}
      className={` ${isLogo ? 'logo' : ''} ${profilee ? 'profilee' : ''} ${
        miniProfile ? 'miniProfile' : ''
      } ${centered ? 'centered' : ''} image `}
      alt="logo"
    />
  </div>
);

export default Image;

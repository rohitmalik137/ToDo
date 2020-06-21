import React from 'react';

import './image.styles.scss';

const Image = ({ logo, isLogo, profilee, miniProfile }) => (
  <div className="image__wrapper">
    <img
      src={logo}
      className={` ${isLogo ? 'logo' : ''} ${profilee ? 'profilee' : ''} ${
        miniProfile ? 'miniProfile' : ''
      } image `}
      alt="logo"
    />
  </div>
);

export default Image;

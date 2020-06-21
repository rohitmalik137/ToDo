import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadUser, logout } from '../../redux/actions/authActions';
import Image from '../image/image.component';
import profile from '../../assets/profile.png';
import './profile-dropdown.styles.scss';

const ProfileDropdown = ({ user, logout }) => (
  <div className="cart-dropdown">
    <div className="cart__header">
      <div>My Account</div>
    </div>
    <div className="profile">
      <Image logo={profile} profilee="yes" />
    </div>
    <div>{user.email}</div>
    <div className="links">
      <Link className="link" to="profile">
        My Profile
      </Link>
      <div onClick={logout} className="link" to="profile">
        Sign out
      </div>
    </div>
  </div>
);

ProfileDropdown.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser, logout })(ProfileDropdown);

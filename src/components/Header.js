import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/components/Header.scss';
import logo from '../assets/static/logo-video.png';
import gravatar from '../utils/gravatar';
import userIcon from '../assets/static/user-icon.png';

const Header = (props) => {
  const { isAuth } = props;
  const headerClass = isAuth ? 'isAuth' : '';

  const handleSignOut = (e) => {};
  const hasUser = false;
  const user = {
    name: 'Alvaro Linarez',
    email: 'alvarolinarez9@gmail.com'
  };

  return (
    <header className={`header ${headerClass}`}>
      <Link to="/">
        <img className="header__img" src={logo} alt="Videos" />
      </Link>
      {!isAuth && (
        <div className="header__menu">
          <div className="header__menu--profile">
            {hasUser ? (
              <img src={gravatar(user.email)} alt={user.email} />
            ) : (
              <img src={userIcon} alt="" />
            )}
            <p>Profile</p>
          </div>
          <ul>
            {hasUser ? (
              <>
                <li>
                  <a href="/">{user.name}</a>
                </li>
                <li>
                  <Link to="#logout" onClick={handleSignOut}>
                    Sign Out
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;

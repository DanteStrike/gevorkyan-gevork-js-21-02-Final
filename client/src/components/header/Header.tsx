import React from 'react';
import './Header.scss';
import Logo from '../logo/Logo';
import Menu from '../menu/Menu';
import ConnectedAuth from '../connected-auth/ConnectedAuth';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__item header__item--logo">
          <Logo />
        </div>
        <div className="header__item header__item--menu">
          <Menu />
        </div>
        <div className="header__item header__item--auth">
          <ConnectedAuth />
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);

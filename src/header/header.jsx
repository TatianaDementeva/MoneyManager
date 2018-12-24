import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends Component {
  render() {
    return (
      <div className="o-header-wrapper">
        <header className="o-header">
          <div className="o-header__menu">
            <NavLink
              exact
              className="o-header__link"
              activeClassName="o-header__link_current"
              to="/reports"
            >
              Отчёты
            </NavLink>
            <NavLink className="o-header__link" activeClassName="o-header__link_current" to="/add">
              Добавить
            </NavLink>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
/*  <NavLink
              exact
              className="o-header__link"
              activeClassName="o-header__link_current"
              to="/"
            >
              Категории
            </NavLink>
            */

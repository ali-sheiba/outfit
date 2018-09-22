import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

const Header = ({ isLogin = false, profile = {} }) => (
  <div className="header py-4">
    <div className="container">
      <div className="d-flex">
        <Link className="header-brand" to="/">
          Out
          <span className="text-info">fit</span>
        </Link>

        {isLogin
          ? (
            <div className="d-flex order-lg-2 ml-auto">
              <UncontrolledDropdown tag="div">
                <DropdownToggle nav className="pr-0 leading-none">
                  <span className="avatar" />
                  <span className="ml-2 d-none d-lg-block">
                    <span className="text-default">{profile.name}</span>
                  </span>
                </DropdownToggle>
                <DropdownMenu right className="dropdown-menu-arrow">
                  <DropdownItem tag={Link} to="/login">
                    <i className="dropdown-icon fe fe-log-out" />
                    Sign out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          )
          : (
            <div className="d-flex order-lg-2 ml-auto">
              <div className="nav-item d-none d-md-flex">
                <Link to="/login" className="btn btn-sm btn-outline-primary">Login</Link>
              </div>
            </div>
          )}

        {/* <a
          href="#"
          className="header-toggler d-lg-none ml-3 ml-lg-0"
          data-toggle="collapse"
          data-target="#headerMenuCollapse"
        >
          <span className="header-toggler-icon" />
        </a> */}

      </div>
    </div>
  </div>
);

Header.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  profile: PropTypes.shape(Object).isRequired,
};

export default withRouter(Header);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Nav, NavItem, NavLink,
} from 'reactstrap';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import startsWith from 'lodash/startsWith';


class Navigation extends Component {
  routes = [
    { name: 'Explore', link: '/explores', icon: 'fa-compass' },
    { name: 'My Items', link: '/items', icon: 'fa-tshirt' },
    { name: 'My Outfits', link: '/outfits', icon: 'fa-user-astronaut' },
    { name: 'Recommendations', link: '/generator', icon: 'fa-magic' },
  ];

  isActive(link) {
    const { location } = this.props;
    return location.pathname === link || (link !== '/' && startsWith(location.pathname, link));
  }

  render() {
    return (
      <div className="header collapse d-lg-flex p-0" id="headerMenuCollapse">
        <Container>
          <Row className="align-items-center">

            <div className="col-lg order-lg-first">
              <Nav tabs className="border-0 flex-column flex-lg-row">
                {this.routes.map(r => (
                  <NavItem key={r.name} className="nav-item">
                    <NavLink tag={Link} to={r.link} className="px-2" active={this.isActive(r.link)}>
                      <i className={classNames('fas mr-2', r.icon)} />
                      {r.name}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
            </div>

          </Row>
        </Container>
      </div>
    );
  }
}


Navigation.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
};

export default withRouter(Navigation);

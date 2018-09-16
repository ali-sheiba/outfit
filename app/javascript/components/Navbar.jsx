import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Nav, NavItem, NavLink,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import startsWith from 'lodash/startsWith';

class Navigation extends Component {
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

                <NavItem className="nav-item">
                  <NavLink tag={Link} to="/" className="px-2" active={this.isActive('/')}>
                    <i className="fas fa-home mr-2" />
                    Home
                  </NavLink>
                </NavItem>

                <NavItem className="nav-item">
                  <NavLink tag={Link} to="/outfits" className="px-2" active={this.isActive('/projects')}>
                    <i className="fas fa-cubes mr-2" />
                    Outfits
                  </NavLink>
                </NavItem>

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

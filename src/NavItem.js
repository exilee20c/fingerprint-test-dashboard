import React, { Component } from 'react';
import {
  Route,
  Link
} from 'react-router-dom';

class NavItem extends Component {
  render() {
    return (
      <Route exact={true} path={this.props.to} children={({match}) => (
        <li className={match ? "active" : ""} role="presentation">
          <Link to={this.props.to}>{this.props.children}</Link>
        </li>
      )} />
    );
  }
}

export default NavItem;
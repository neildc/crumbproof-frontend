import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import RecipeIcon from 'material-ui/svg-icons/action/description';
import ActivityIcon from 'material-ui/svg-icons/image/gradient';
import LiveIcon from 'material-ui/svg-icons/image/timer';

import { authLogout } from '../actions/actions_auth';

import './header.css';


const navItems = [
  { title: 'Activities', url: '/activity', icon: ActivityIcon },
  { title: 'Recipes', url: '/recipes', icon: RecipeIcon },
  { title: 'Live activity', url: '/live', icon: LiveIcon },
];

class Header extends Component {
  authButton() {
    if (this.props.authenticatedUser) {
      return <FlatButton onClick={this.props.authLogout} label="Logout" />;
    }
    return <FlatButton containerElement={<Link to="/login" />} label="Login" />;
  renderAppBarNavLinks() {
    return (
      _.map(navItems, i => (
        <FlatButton
          containerElement={<Link to={i.url} />}
          label={i.title}
          labelStyle={{ color: 'white' }}
          icon={<i.icon color="#FFFFFF" />}
        />
      ))
    );
  }

  }

  render() {
    return (
      <div style={{ position: 'fixed', width: '100%', zIndex: 3 }}>
        <AppBar
          className="appBar"
          title="crumbproof"
          showMenuIconButton={false}
          <div className="navLinks">
            { window.innerWidth > 640 &&
              this.renderAppBarNavLinks()
            }
            {this.authButton()}
          </div>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    authenticatedUser: auth.user,
  };
}

export default connect(mapStateToProps, { authLogout })(Header);

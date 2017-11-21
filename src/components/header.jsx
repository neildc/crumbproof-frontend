import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Drawer from 'material-ui/Drawer';
import { ListItem } from 'material-ui/List';

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

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { drawerOpen: false };
  }

  handleDrawerToggle() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  authButton() {
    const Button = props => (
      <FlatButton
        {...props}
        labelStyle={{ color: 'white' }}
        className="authButton"
      />
    );

    if (this.props.authenticatedUser) {
      return <Button onClick={this.props.authLogout} label="Logout" />;
    }
    return <Button containerElement={<Link to="/login" />} label="Login" />;
  }

  closeDrawer() {
    this.setState({ drawerOpen: false });
  }

  renderAppBarNavLinks() {
    return (
      _.map(navItems, i => (
        <FlatButton
          key={i.title}
          containerElement={<Link to={i.url} />}
          label={i.title}
          labelStyle={{ color: 'white' }}
          icon={<i.icon color="#FFFFFF" />}
        />
      ))
    );
  }

  renderNavDrawerItems() {
    return (
      _.map(navItems, i => (
        <ListItem
          key={i.title}
          primaryText={i.title}
          containerElement={<Link to={i.url} />}
          leftIcon={<i.icon />}
          onClick={() => this.closeDrawer()}
        />
      ))
    );
  }

  render() {
    return (
      <div style={{ position: 'fixed', width: '100%', zIndex: 3 }}>
        <AppBar
          className="appBar"
          title="crumbproof"
          onLeftIconButtonTouchTap={() => this.handleDrawerToggle()}
        >
          <div className="navLinks">
            { window.innerWidth > 640 &&
              this.renderAppBarNavLinks()
            }
            {this.authButton()}
          </div>
        </AppBar>

        <Drawer
          open={this.state.drawerOpen}
          docked={false}
          className="drawer"
          onRequestChange={open => this.setState({ drawerOpen: open })}
        >
          {this.renderNavDrawerItems()}
        </Drawer>
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

import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Drawer from "material-ui/Drawer";
import { ListItem } from "material-ui/List";

import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";

import ReactTooltip from "react-tooltip";

import RecipeIcon from "material-ui/svg-icons/action/description";
import ActivityIcon from "material-ui/svg-icons/image/gradient";
import LiveIcon from "material-ui/svg-icons/image/timer";
import PersonIcon from "material-ui/svg-icons/social/person";
import PublicIcon from "material-ui/svg-icons/social/public";

import {
  authLogout,
  authToggleContentVisibility
} from "../actions/actions_auth";

import "./header.css";

const navItems = [
  { title: "Activities", url: "/activity", icon: ActivityIcon },
  { title: "Recipes", url: "/recipes", icon: RecipeIcon },
  { title: "Live activity", url: "/live", icon: LiveIcon }
];

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { drawerOpen: false };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.contentVisibilityUserOnly !==
      prevProps.contentVisibilityUserOnly
    ) {
        ReactTooltip.hide();
      ReactTooltip.rebuild();
    }
  }

  handleDrawerToggle() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  contentVisIcon(color) {
    if (this.props.contentVisibilityUserOnly === true) {
      return <PersonIcon color={color} data-tip data-for="tooltip" />;
    } else {
      return <PublicIcon color={color} data-tip data-for="tooltip" />;
    }
  }

  authButton() {
    const Button = props => (
      <FlatButton {...props} labelStyle={{ color: "white" }} />
    );
    if (this.props.authenticatedUser) {
      return (
        <div>
          <ReactTooltip
            multiline
            place="bottom"
            type="dark"
            effect="solid"
            getContent={() =>
              this.props.contentVisibilityUserOnly ? (
                <p>
                  Showing your activities/recipes only
                  <br />
                  <br /> Click to show everyones.
                </p>
              ) : (
                <p>
                  Showing everyones activities/recipes
                  <br /> <br /> Click to see yours only.
                </p>
              )
            }
            id="tooltip"
          />

          <Button
            labelStyle={{ color: "white" }}
            onClick={this.props.authToggleContentVisibility}
            label=""
            icon={this.contentVisIcon("#FFFFFF")}
          />
          <Button
            onClick={this.props.authLogout}
            label="Logout"
            className="authButton"
          />
        </div>
      );
    }
    return <Button containerElement={<Link to="/login" />} label="Login" />;
  }

  closeDrawer() {
    this.setState({ drawerOpen: false });
  }

  renderAppBarNavLinks() {
    return _.map(navItems, i => (
      <FlatButton
        key={i.title}
        containerElement={<Link to={i.url} />}
        label={i.title}
        labelStyle={{ color: "white" }}
        icon={<i.icon color="#FFFFFF" />}
      />
    ));
  }

  renderNavDrawerItems() {
    return _.concat(
      _.map(navItems, i => (
        <ListItem
          key={i.title}
          primaryText={i.title}
          containerElement={<Link to={i.url} />}
          leftIcon={<i.icon />}
          onClick={() => this.closeDrawer()}
        />
      )),
      <ListItem
        key={"AAAAA"}
        primaryText={"Toggle content visibility"}
        leftIcon={this.contentVisIcon("#000000")}
        onClick={() => {
          this.props.authToggleContentVisibility();
          this.closeDrawer();
        }}
      />
    );
  }

  render() {
    return (
      <div style={{ position: "fixed", width: "100%", zIndex: 3 }}>
        <AppBar
          className="appBar"
          title="crumbproof"
          onLeftIconButtonTouchTap={() => this.handleDrawerToggle()}
        >
          <div className="navLinks">
            {window.innerWidth > 640 && this.renderAppBarNavLinks()}
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
    contentVisibilityUserOnly: auth.contentVisibilityUserOnly
  };
}

export default connect(
  mapStateToProps,
  { authLogout, authToggleContentVisibility }
)(Header);

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authLogout } from "../actions/actions_auth";

import AppBar from 'material-ui/AppBar';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

class Header extends React.Component {

  authButton() {
    if (this.props.authenticatedUser) {
      return <FlatButton onClick={this.props.authLogout} label={"Logout"} />
    } else {
      return <FlatButton containerElement={<Link to="/login"/>} label={"Login"} />
    }
  }

  render() {
    return (
      <div style={{position:"fixed", width:"100%", zIndex: 3}}>
        <AppBar
          className="appBar"
          title="crumb proof"
          showMenuIconButton={false}
          iconElementRight={this.authButton()}
        />
        <Toolbar className="toolbar">
          <ToolbarGroup>
            <FlatButton containerElement={<Link to="/activity"/>} label={"Activites"} />
            <FlatButton containerElement={<Link to="/recipies"/>} label={"Recipes"} />
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
}

function mapStateToProps({auth}) {
  return { authenticatedUser: auth.user};
}

export default connect(mapStateToProps, {authLogout})(Header);

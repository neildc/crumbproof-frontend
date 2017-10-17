import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authForbidden } from '../../actions/actions_auth';

export default function(WrappedComponent, errorMessage) {
  class RequireAuthentication extends Component {

    componentWillMount() {
      if (!this.props.authenticatedUser) {
        this.props.authForbidden(errorMessage);
        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticatedUser) {
        this.props.authForbidden(errorMessage);
        this.props.history.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  function mapStateToProps({auth}) {
    return { authenticatedUser: auth.user};
  }


  return connect(mapStateToProps, {authForbidden})(RequireAuthentication);
}

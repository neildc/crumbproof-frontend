import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Motion, spring, presets } from 'react-motion';

import MUIFloatingActionButton from 'material-ui/FloatingActionButton';

import './floating_action_button.css';

export default class FloatingActionButton extends Component {
  render() {
    return (
      <Motion
        defaultStyle={{ x: 1000 }}
        style={{ x: spring(0, presets.gentle) }}
      >
        {iStyle => (
          <MUIFloatingActionButton
            className="floatingActionButton"
            backgroundColor="#6BD425"
            containerElement={<Link to={this.props.link} />}
            style={{ transform: `translate(${iStyle.x}px)` }}
          >
            {this.props.children}
          </MUIFloatingActionButton>
      )}
      </Motion>
    );
  }
}

FloatingActionButton.propTypes = {
  link: PropTypes.string.isRequired,
};

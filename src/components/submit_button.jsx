import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

export default class SubmitButton extends React.Component {
  render() {
    const {
      submittingFlag, label, labelInProgress, flat, ...rest
    } = this.props;

    const ButtonComponent = flat ? FlatButton : RaisedButton;

    return (
      <ButtonComponent
        {...rest}
        label={submittingFlag ? labelInProgress : label}
        labelPosition="before"
        disabled={submittingFlag}
        type="submit"
        primary={!flat}
        icon={submittingFlag &&
        <CircularProgress
          style={{ marginLeft: '20px' }}
          size={20}
          thickness={3}
        />
      }
      />
    );
  }
}

SubmitButton.propTypes = {
  submittingFlag: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  labelInProgress: PropTypes.string.isRequired,
  flat: PropTypes.bool,
};

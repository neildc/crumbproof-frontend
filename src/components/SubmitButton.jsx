import React from "react";
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

export default class SubmitButton extends React.Component {
  render() {
    const {submittingFlag, label, labelInProgress , ...rest } = this.props

    return (
      <RaisedButton
      {...rest}
      label={submittingFlag ? labelInProgress : label}
      labelPosition="before"
      disabled={submittingFlag}
      type={'submit'}
      primary={true}
      icon={submittingFlag &&
            <CircularProgress style={{marginLeft:"20px"}}
                              size={20}
                              thickness={3}/>
      }
      />
    )
  }
}

SubmitButton.propTypes = {
  submittingFlag: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  labelInProgress: PropTypes.string.isRequired
};

/* eslint "react/prefer-stateless-function": "off" */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { doCheckin, undoCheckin } from '../actions/topic';
import FloatingButton from './FloatingButton';

const propTypes = {
  disabled: PropTypes.bool,
  color: PropTypes.string,
  onCheckin: PropTypes.func,
  topic: PropTypes.object,
  isChecked: PropTypes.bool,
};
const defaultProps = {};

function mapStateToProps(state) {
  const { user, topic } = state;
  const disabled = !user.isLogged || !topic.tag;
  const isChecked = topic.checkins.filter(({ username }) => username === user.username).length > 0;
  const color = isChecked ? 'primary' : null;

  return {
    disabled,
    color,
    isChecked,
    topic,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onCheckin: (tag, isChecked) => {
      if (tag) {
        if (!isChecked) {
          dispatch(doCheckin(tag));
        } else {
          dispatch(undoCheckin(tag));
        }
      }
    },
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class CheckinButton extends React.Component {
  render = () => {
    const { disabled, color, onCheckin, topic, isChecked } = this.props;
    const checkinHandler = onCheckin.bind(this, topic.tag, isChecked);

    return (
      <FloatingButton
        size={'big'}
        icon={'check'}
        disabled={disabled}
        color={color}
        onClick={checkinHandler}
      />
    );
  };
}

CheckinButton.propTypes = propTypes;
CheckinButton.defaultProps = defaultProps;

export default CheckinButton;

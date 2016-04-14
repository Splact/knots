import React from 'react';
import { connect } from 'react-redux';
import { doCheckin, undoCheckin } from '../actions/topic';
import FloatingButton from './FloatingButton';

function mapStateToProps(state) {
  const { user, topic } = state;
  const disabled = !user.isLogged || !topic.tag;
  const isChecked = topic.checkins.filter(({username}) => username === user.username).length > 0;
  const color = isChecked ? 'primary' : null;

  return {
    disabled,
    color,
    isChecked,
    topic
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
    }
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CheckinButton extends React.Component {
  render = () => {
    const { disabled, color, onCheckin, topic, isChecked } = this.props;
    const checkinHandler = onCheckin.bind(this, topic.tag, isChecked);

    return (
      <FloatingButton
        size={'big'}
        icon={'check'}
        disabled={disabled}
        color={color}
        onClick={checkinHandler} />
    );
  };
}

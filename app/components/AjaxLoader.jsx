/* eslint "react/prefer-stateless-function": "off" */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

const propTypes = {
  pendingStates: PropTypes.object,
};
const defaultProps = {};

function mapStateToProps(state) {
  const { user, topic, search, app } = state;
  return {
    pendingStates: {
      isLoggingIn: user.isLoggingIn,
      isLoggingOut: user.isLoggingOut,
      isFetchingUser: user.isFetching,
      isUpdatingPosition: user.isUpdatingPosition,
      isChangingCheckin: topic.isChangingCheckin,
      isCreatingTopic: topic.isCreating,
      isFetchingTopic: topic.isFetching,
      isSearching: search.isSearching,
      isAppNotReady: !app.isReady,
    },
  };
}

@connect(mapStateToProps)
class AjaxLoader extends React.Component {
  render = () => {
    const { pendingStates } = this.props;
    const arrayStates = Object.values(pendingStates);

    let loaderClasses = classnames('ajax-loader', {
      'ajax-loader--loading': arrayStates.some((pendingState) => pendingState === true),
    });

    return (
      <div className={loaderClasses}></div>
    );
  };
}

AjaxLoader.propTypes = propTypes;
AjaxLoader.defaultProps = defaultProps;

export default AjaxLoader;

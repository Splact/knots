import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

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
      isAppNotReady: !app.isReady
    }
  };
}

@connect(mapStateToProps)
export default class AjaxLoader extends React.Component {
  render = () => {
    const { pendingStates } = this.props;
    const arrayStates = Object.values(pendingStates);

    let loaderClasses = classnames('ajax-loader', {
      'ajax-loader--loading': arrayStates.some((pendingState) => pendingState === true)
    });

    return (
      <div className={loaderClasses}></div>
    );
  };
}

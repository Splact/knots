import React from 'react';
import classnames from 'classnames';

export default class Avatar extends React.Component {
  render = () => {
    const { url, defaultUrl } = this.props;

    let avatarClasses = classnames('profile--avatar');
    let avatarUrl = url || defaultUrl;

    return (
      <div className={avatarClasses}>
        <img src={avatarUrl}/>
      </div>
    );
  };
}

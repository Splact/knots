import React from 'react';
import classnames from 'classnames';

export default class Profile extends React.Component {
  render = () => {

    let avatarClasses = classnames('profile--avatar');
    // TODO: get from a store
    let avatarUrl = 'https://randomuser.me/api/portraits/med/women/78.jpg';

    return (
      <div className={avatarClasses}>
        <img src={avatarUrl}/>
      </div>
    );
  };
}

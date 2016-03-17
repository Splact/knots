import config from '../constants/config';
import React from 'react';
import classnames from 'classnames';
import AltContainer from 'alt-container';

import Map from './Map';
import MarkerStore from '../stores/MarkerStore';

import Profile from './Profile';
import ProfileStore from '../stores/ProfileStore';

export default class App extends React.Component {
  render = () => {
    let wrapperClasses = classnames('knots-wrapper');
    return (
      <div className={wrapperClasses}>
        <AltContainer
          stores={[ProfileStore]}
          inject={{
            id: () => ProfileStore.getState().profile.id || null,
            name: () => ProfileStore.getState().profile.name || null,
            picture: () => ProfileStore.getState().profile.picture || null
          }}
        >
          <Profile
            facebookOptions={config.facebook}
            defaultPicture={config.profile.defaultPicture}/>
        </AltContainer>
        <AltContainer
            stores={[MarkerStore]}
            inject={{
              markers: () => MarkerStore.getState().markers || []
            }}
          >
          <Map options={config.map.options}/>
        </AltContainer>
      </div>
    );
  };
}

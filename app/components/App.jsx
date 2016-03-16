import config from '../constants/config';
import React from 'react';
import classnames from 'classnames';
import AltContainer from 'alt-container';

import Map from './Map';
import MarkerStore from '../stores/MarkerStore';

import Profile from './Profile';

export default class App extends React.Component {
  render = () => {
    let wrapperClasses = classnames('knots-wrapper');
    return (
      <div className={wrapperClasses}>
        <Profile facebookOptions={config.facebook.options}/>
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

import config from '../constants/config';
import React from 'react';
import classnames from 'classnames';
import AltContainer from 'alt-container';
//import webApi from '../libs/webApi';

import Map from './Map';
import MarkerStore from '../stores/MarkerStore';

import Profile from './Profile';
import ProfileStore from '../stores/ProfileStore';

import FloatingButton from './FloatingButton';
import Prompt from './Prompt';

export default class App extends React.Component {
  state = {
    isLogged: false
  };

  render = () => {
    const { isLogged } = this.state;
    let wrapperClasses = classnames('knots-wrapper');
    return (
      <div className={wrapperClasses}>
        <AltContainer
          stores={[ProfileStore]}
          inject={{
            bearerToken: () => ProfileStore.getState().bearerToken || null,
            username: () => ProfileStore.getState().profile.username || null,
            displayName: () => ProfileStore.getState().profile.displayName || null,
            picture: () => ProfileStore.getState().profile.picture || null
          }}
        >
          <Profile
            facebookOptions={config.facebook}
            defaultPicture={config.profile.defaultPicture}
            onLogin={this.onLoginHandle}
            onLogout={this.onLogoutHandle}/>
        </AltContainer>
        <Prompt
          placeholder={'Search tags'}
          size={'big'}
          icon={'search'} />
        <AltContainer
            stores={[MarkerStore]}
            inject={{
              markers: () => MarkerStore.getState().markers || []
            }}
          >
          <Map options={config.map.options}/>
        </AltContainer>
        <FloatingButton
          size={'big'}
          disabled={!isLogged}
          onClick={this.onCreateTopicClick}
          icon={'check'}/>
      </div>
    );
  };

  onLoginHandle = () => {
    this.setState({
      isLogged: true
    });
  };
  onLogoutHandle = () => {
    this.setState({
      isLogged: false
    });
  };

  onCreateTopicClick = () => {
    console.log('TODO: open prompt');
  };
}


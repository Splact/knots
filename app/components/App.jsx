import config from '../constants/config';
import React from 'react';
import classnames from 'classnames';
import AltContainer from 'alt-container';

import Map from './Map';
import TopicStore from '../stores/TopicStore';
import TopicActions from '../actions/TopicActions';

import Profile from './Profile';
import ProfileStore from '../stores/ProfileStore';

import FloatingButton from './FloatingButton';

import SearchBox from './SearchBox';
import SearchStore from '../stores/SearchStore';

export default class App extends React.Component {
  render = () => {
    const wrapperClasses = classnames('knots-wrapper');

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
            facebookOptions={config.facebook} />
        </AltContainer>

        <AltContainer
          stores={[SearchStore]}
          inject={{
            results: () => SearchStore.getState().results || null,
            query: () => SearchStore.getState().query || null
          }}
        >
          <SearchBox />
        </AltContainer>

        <AltContainer
          stores={[TopicStore, ProfileStore]}
          inject={{
            disabled: () => !ProfileStore.getState().bearerToken || !TopicStore.getState().tag,
            color: () => {
              const { username } = ProfileStore.getState().profile;
              const { checkins } = TopicStore.getState();

              return (checkins.filter(({id}) => id === username).length > 0) ? 'primary' : null;
            }
          }}
        >
          <FloatingButton
            size={'big'}
            onClick={this.handleCheckinClick}
            icon={'check'} />
        </AltContainer>
        <AltContainer
          stores={[ TopicStore ]}
          inject={{
            markers: () => TopicStore.getState().checkins || [],
            title: () => TopicStore.getState().tag || null
          }}
        >
          <Map options={config.map.options}/>
        </AltContainer>
      </div>
    );
  };

  handleCheckinClick = () => {
    const { tag, checkins } = TopicStore.getState();
    const { username } = ProfileStore.getState().profile;

    const isChecked = checkins.filter(user => user.id === username).length > 0;

    if (tag) {
      if (!isChecked) {
        TopicActions.doCheckin({ tag });
      } else {
        TopicActions.undoCheckin({ tag });
      }
    }
  };
}


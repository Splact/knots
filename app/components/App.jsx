import config from '../constants/config';
import React from 'react';
import AltContainer from 'alt-container';

import Map from './Map';
import MarkerStore from '../stores/MarkerStore';

export default class App extends React.Component {
  render = () => {
    return (
      <AltContainer
          stores={[MarkerStore]}
          inject={{
            markers: () => MarkerStore.getState().markers || []
          }}
        >
        <Map options={config.map.options}/>
      </AltContainer>
    );
  };
}

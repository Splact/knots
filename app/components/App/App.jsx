import config from '../../constants/config.js';
import React from 'react';
import Map from '../Map/Map.jsx';

export default class App extends React.Component {
  render = () => {
    return (
      <Map
        options={config.map.options}/>
    );
  };
}

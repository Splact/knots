import React from 'react';
import { default as update } from 'react-addons-update';
import { default as FaSpinner } from 'react-icons/lib/fa/spinner';
import { default as ScriptjsLoader } from 'react-google-maps/lib/async/ScriptjsLoader';
import { GoogleMap, Marker } from 'react-google-maps';
import { default as canUseDOM } from 'can-use-dom';

const geolocation = (
  canUseDOM && navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure('Your browser doesn\'t support geolocation.');
    }
  }
);

export default class Map extends React.Component {

  static version = 22;

  state = {
    center: null,
    markers: [{
      position: {
        lat: 25.0112183,
        lng: 121.52067570000001
      },
      key: 'Taiwan',
      defaultAnimation: 2
    }]
  };

  componentDidMount() {
    // check for gps positioning
    geolocation.getCurrentPosition((position) => {
      console.log('User position updated.');
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    }, () => {
      this.setState({
        center: this.props.options.defaultCenter
      });
    });
  }

  render = () => {
    const { defaultZoom, defaultCenter, ...options } = this.props.options;

    let { center } = this.state;
    let contents = [];

    return (
      <ScriptjsLoader
        hostname={'maps.googleapis.com'}
        pathname={'/maps/api/js'}
        query={{ v: `3.${ Map.version }`, libraries: `geometry,drawing,places` }}
        loadingElement={
          <div {...this.props} style={{ height: `100%` }}>
            <FaSpinner
              style={{
                display: 'block',
                width: 200,
                height: 200,
                margin: '100px auto',
                animation: 'fa-spin 2s infinite linear'
              }}
            />
          </div>
        }
        containerElement={
          <div {...this.props} style={{ height: `100%` }} />
        }
        googleMapElement={
          <GoogleMap
            ref={'map'}
            defaultZoom={defaultZoom}
            defaultCenter={defaultCenter}
            center={center}
            onClick={this.handleMapClick}
            options={options}
            onCenterChanged={this.handleCenterChanged}
          >
            {this.state.markers.map((marker, index) => {
              return (
                <Marker
                  {...marker}
                  onRightclick={this.handleMarkerRightclick.bind(this, index)}
                />
              );
            })}
            {contents}
          </GoogleMap>
        } />
    );
  };

  /*
   * This is called on panning
   */
  handleCenterChanged = () => {
    const center = this.refs.map.getCenter();
    const bounds = this.refs.map.getBounds();
    const ne = this.props.options.allowedBounds.ne;
    const sw = this.props.options.allowedBounds.sw;

    if ((bounds.getNorthEast().lat() <= ne.lat) && (bounds.getSouthWest().lat() >= sw.lat)) {
      this.setState({
        center: {
          lat: center.lat(),
          lng: center.lng()
        }
      });
      return;
    }

    // not valid anymore => return to last valid position
    this.refs.map.panTo(this.state.center);

  };

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick = (event) => {
    let { markers } = this.state;
    markers = update(markers, {
      $push: [
        {
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now() // Add a key property for: http://fb.me/react-warning-keys
        }
      ]
    });
    this.setState({ markers });
  };

  handleMarkerRightclick(index) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    let { markers } = this.state;
    markers = update(markers, {
      $splice: [
        [index, 1]
      ]
    });
    this.setState({ markers });
  }
}

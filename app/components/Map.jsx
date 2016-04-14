import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { default as FaSpinner } from 'react-icons/lib/fa/spinner';
import { default as ScriptjsLoader } from 'react-google-maps/lib/async/ScriptjsLoader';
import { GoogleMap, Marker } from 'react-google-maps';
import { default as MarkerClusterer } from 'react-google-maps/lib/addons/MarkerClusterer';
import { default as canUseDOM } from 'can-use-dom';
import { updatePosition } from '../actions/user';

const geolocation = (
  canUseDOM && navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure('Your browser doesn\'t support geolocation.');
    }
  }
);

function mapStateToProps(state) {
  const { tag, checkins } = state.topic;

  return {
    markers: checkins || [],
    title: tag || null
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onPositionUpdated: (position) => {
      dispatch(updatePosition(position));
    }
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Map extends React.Component {

  static version = 22;

  constructor({...props}) {
    super(props);

    this.state = {
      center: null
    };
  }

  componentDidMount() {

    const { onPositionUpdated, options } = this.props;

    // check for gps positioning
    geolocation.getCurrentPosition((position) => {
      const newPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      onPositionUpdated(newPosition);

      this.setState({
        center: newPosition
      });
    }, () => {
      this.setState({
        center: options.defaultCenter
      });
    });
  }

  render = () => {
    const { markers, options, title, ...props } = this.props;
    const { defaultZoom, defaultCenter } = options;
    const { center } = this.state;

    const styles = {
      map: classnames('map'),
      title: classnames('map--title')
    };

    const titleElement = (title) ? <div className={styles.title}>{title}</div> : null;

    return (
      <ScriptjsLoader
        hostname={'maps.googleapis.com'}
        pathname={'/maps/api/js'}
        query={{ v: `3.${ Map.version }`, libraries: `geometry,drawing,places` }}
        loadingElement={
          <div {...props} style={{ height: `100%` }}>
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
          <div {...props} style={{ height: `100%` }} />
        }
        googleMapElement={
          <GoogleMap
            ref={'map'}
            className={styles.map}
            defaultZoom={defaultZoom}
            defaultCenter={defaultCenter}
            center={center}
            onClick={this.handleMapClick}
            options={options}
            onCenterChanged={this.handleCenterChanged}
          >
            <MarkerClusterer
              averageCenter
              enableRetinaIcons
              gridSize={ 60 }
            >
              {markers.map(marker => (
                <Marker
                  position={marker.position}
                  key={ marker.username }
                />
              ))}
            </MarkerClusterer>
            {titleElement}
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

  handleMapClick = () => {
    return;
  };

  handleMarkerRightclick() {
    return;
  }
}

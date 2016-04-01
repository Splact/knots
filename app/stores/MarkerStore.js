import alt from '../libs/alt';
import MarkerActions from '../actions/MarkerActions';
import { webApi, TOPIC_CHECKINS } from '../libs/webApi';

class MarkerStore {
  constructor() {
    this.bindActions(MarkerActions);

    this.markers = [];

  }

  loadMarkers({ tag }) {
    webApi(TOPIC_CHECKINS, { tag });
  }
  loadMarkersSuccess({ checkins }) {
    const markers = checkins.map(({ username, position }) => ({
      id: username,
      lat: position.lat,
      lng: position.lng
    }));
    this.setState({ markers });
  }
}

export default alt.createStore(MarkerStore, 'MarkerStore');

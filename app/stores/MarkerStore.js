import uuid from 'node-uuid';
import alt from '../libs/alt';
import MarkerActions from '../actions/MarkerActions';

class MarkerStore {
  constructor() {
    this.bindActions(MarkerActions);

    this.markers = [];

    this.exportPublicMethods({
      getMarkersByIds: this.getMarkersByIds.bind(this)
    });
  }

  create(marker) {
    const markers = this.markers;

    marker.id = uuid.v4();

    this.setState({
      markers: markers.concat(marker)
    });

    return marker;
  }

  update(updatedMarker) {
    const markers = this.markers.map(marker => {
      if (marker.id === updatedMarker.id) {
        return Object.assign({}, marker, updatedMarker);
      }

      return marker;
    });

    // ES6 feature known as property shorthand
    // This is same as `this.setState({markers: markers})`
    this.setState({markers});
  }

  delete(id) {
    this.setState({
      markers: this.markers.filter(marker => marker.id !== id)
    });
  }

  getMarkersByIds(ids) {
    // 1. Make sure we are operating on an array and
    // map over the ids
    // [id, id, id, ...] -> [[Marker], [], [Marker], ...]
    return (ids || []).map(
      // 2. Extract matching markers
      // [Marker, Marker, Marker] -> [Marker, ...] (match) or [] (no match)
      id => this.markers.filter(marker => marker.id === id)
    // 3. Filter out possible empty arrays and get markers
    // [[Marker], [], [Marker]] -> [[Marker], [Marker]] -> [Marker, Marker]
    ).filter(a => a.length).map(a => a[0]);
  }
}

export default alt.createStore(MarkerStore, 'MarkerStore');

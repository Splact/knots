import alt from '../libs/alt';
import TopicActions from '../actions/TopicActions';
import ProfileStore from '../stores/ProfileStore';
import { webApi, READ_TOPIC, DO_TOPIC_CHECKIN, UNDO_TOPIC_CHECKIN } from '../libs/webApi';

class TopicStore {
  constructor() {
    this.bindActions(TopicActions);

    this.tag = null;
    this.checkins = [];
  }

  read({ tag }) {
    webApi(READ_TOPIC, { tag });
  }
  readSuccess({ tag, checkins }) {
    checkins = checkins.map(({ username, position }) => ({
      id: username,
      lat: position.lat,
      lng: position.lng
    }));
    this.setState({ tag, checkins });
  }

  doCheckin({ tag }) {
    webApi(DO_TOPIC_CHECKIN, { tag });
  }

  doCheckinSuccess() {
    const { checkins } = this;
    const { username, position } = ProfileStore.getState().profile;

    console.log({ checkins, username, position });

    checkins.push({
      id: username,
      lat: position.lat,
      lng: position.lng
    });

    this.setState({ checkins });
  }

  undoCheckin({ tag }) {
    webApi(UNDO_TOPIC_CHECKIN, { tag });
  }

  undoCheckinSuccess() {
    let { checkins } = this;
    const { username } = ProfileStore.getState().profile;
    checkins = checkins.filter(({ id }) => id !== username);

    this.setState({ checkins });
  }
}

export default alt.createStore(TopicStore, 'TopicStore');

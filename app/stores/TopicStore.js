import alt from '../libs/alt';
import TopicActions from '../actions/TopicActions';
import ProfileStore from '../stores/ProfileStore';
import { webApi, READ_TOPIC, CREATE_TOPIC, DO_TOPIC_CHECKIN, UNDO_TOPIC_CHECKIN } from '../libs/webApi';

class TopicStore {
  constructor() {
    this.bindActions(TopicActions);

    this.tag = null;
    this.checkins = [];
    this.isPending = {
      create: false,
      fetch: false
    };
  }

  create({ tag }) {
    this.setState({
      isPending: {
        create: true
      }
    });
    webApi(CREATE_TOPIC, { tag });
  }
  createSuccess({ tag }) {
    const { username, position } = ProfileStore.getState().profile;
    const checkins = [{
      id: username,
      lat: position.lat,
      lng: position.lng
    }];
    this.setState({
      tag,
      checkins,
      isPending: {
        create: false
      }
    });
  }

  read({ tag }) {
    this.setState({
      isPending: {
        fetch: true
      }
    });
    webApi(READ_TOPIC, { tag });
  }
  readSuccess({ tag, checkins }) {
    checkins = checkins.map(({ username, position }) => ({
      id: username,
      lat: position.lat,
      lng: position.lng
    }));
    this.setState({
      tag,
      checkins,
      isPending: {
        fetch: false
      }
    });
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

import alt from '../libs/alt';
import ProfileActions from '../actions/ProfileActions';

const defaultProfile = {
  id: null,
  name: null,
  picture: null,
  accessToken: null
};

class ProfileStore {
  constructor() {
    this.bindActions(ProfileActions);

    this.profile = defaultProfile;
  }

  login(newProfile) {
    // TODO: any check and/or ops

    const { id, name, picture, position, accessToken } = newProfile;
    const profile = { id, name, picture, position, accessToken };

    this.setState({ profile });

    return profile;
  }

  logout() {
    const profile = defaultProfile;

    this.setState({ profile });
  }

  updatePosition(position) {
    let profile = this.profile;
    profile.position = position;

    this.setState({ profile });
  }

  // CHECK: maybe useless
  update(profile) {
    this.setState({ profile });
  }
}

export default alt.createStore(ProfileStore, 'ProfileStore');

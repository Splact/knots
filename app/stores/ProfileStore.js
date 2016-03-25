import alt from '../libs/alt';
import ProfileActions from '../actions/ProfileActions';
import { webApi, FACEBOOK_LOGIN, CURRENT_USER } from '../libs/webApi';

const defaultProfile = {
  username: null,
  displayName: null,
  picture: null,
  bearerToken: null
};

class ProfileStore {
  constructor() {
    this.bindActions(ProfileActions);

    this.profile = defaultProfile;
    this.bearerToken = null;
  }

  login(accessToken) {
    webApi(FACEBOOK_LOGIN, { accessToken });
  }

  updateBearerToken(bearerToken) {
    if (!bearerToken) {
      return this.logout();
    }

    if (bearerToken === this.bearerToken) {
      return false;
    }

    this.setState({ bearerToken });

    // update profile data
    webApi(CURRENT_USER, { bearerToken });
  }

  updateProfile(newProfile) {
    // TODO: any check and/or ops

    const { username, displayName, picture, position } = newProfile;
    const profile = { username, displayName, picture, position };

    this.setState({ profile });

    return profile;
  }

  logout() {
    const profile = defaultProfile;

    this.setState({
      profile,
      bearerToken: null
    });
  }

  updatePosition(position) {
    let profile = this.profile;
    profile.position = position;

    this.setState({ profile });
  }
}

export default alt.createStore(ProfileStore, 'ProfileStore');

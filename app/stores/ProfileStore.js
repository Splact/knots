import alt from '../libs/alt';
import ProfileActions from '../actions/ProfileActions';
import { webApi, FACEBOOK_LOGIN, CURRENT_USER, UPDATE_USER_POSITION, LOGOUT, UPDATE_BEARERTOKEN } from '../libs/webApi';

const defaultProfile = {
  username: null,
  displayName: null,
  picture: null
};

class ProfileStore {
  constructor() {
    this.bindActions(ProfileActions);

    this.profile = defaultProfile;
    this.bearerToken = null;
  }

  login(accessToken) {
    // TODO: set login state loading
    webApi(FACEBOOK_LOGIN, { accessToken });
  }
  loginSuccess({ token }) {
    this.setState({ bearerToken: token });
    // TODO: set login state loaded

    this.updateBearerToken(token);
    this.fetchUser();
  }

  fetchUser() {
    // request current user data from webApi
    webApi(CURRENT_USER);
  }
  fetchUserSuccess({ username, displayName, picture, position }) {
    // TODO: any check and/or ops

    const profile = { username, displayName, picture, position };

    this.setState({ profile });

    return profile;
  }

  logout() {
    const profile = defaultProfile;

    webApi(LOGOUT);

    this.setState({
      profile,
      bearerToken: null
    });
  }

  updatePosition(position) {
    // TODO: set position state loading
    webApi(UPDATE_USER_POSITION, { position });
  }
  updatePositionSuccess(position) {
    let profile = this.profile;
    profile.position = position;
    // TODO: set position state loaded
    this.setState({ profile });
  }

  updateBearerToken(bearerToken) {
    webApi(UPDATE_BEARERTOKEN, { bearerToken });
  }
}

export default alt.createStore(ProfileStore, 'ProfileStore');

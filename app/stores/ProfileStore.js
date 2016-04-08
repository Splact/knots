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
    this.isPending = {
      login: false,
      fetch: false,
      updatePosition: false
    };
  }

  login(accessToken) {
    this.setState({
      isPending: {
        login: true
      }
    });
    webApi(FACEBOOK_LOGIN, { accessToken });
  }
  loginSuccess({ token }) {
    this.setState({
      bearerToken: token,
      isPending: {
        login: false
      }
    });

    this.updateBearerToken(token);
    this.fetchUser();
  }

  fetchUser() {
    this.setState({
      isPending: {
        fetch: true
      }
    });
    // request current user data from webApi
    webApi(CURRENT_USER);
  }
  fetchUserSuccess({ username, displayName, picture, position }) {
    // TODO: any check and/or ops

    const profile = { username, displayName, picture, position };

    this.setState({
      profile,
      isPending: {
        fetch: false
      }
    });

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
    this.setState({
      isPending: {
        updatePosition: true
      }
    });
    webApi(UPDATE_USER_POSITION, { position });
  }
  updatePositionSuccess({ position }) {
    let profile = this.profile;
    profile.position = position;
    this.setState({
      profile,
      isPending: {
        updatePosition: false
      }
    });
  }
  updatePositionFailed() {
    this.setState({
      isPending: {
        updatePosition: false
      }
    });
  }

  updateBearerToken(bearerToken) {
    webApi(UPDATE_BEARERTOKEN, { bearerToken });
  }
}

export default alt.createStore(ProfileStore, 'ProfileStore');

import alt from '../libs/alt';
import ProfileActions from '../actions/ProfileActions';
import ProfileSource from '../sources/ProfileSource';
import { datasource } from 'alt-utils/lib/decorators';
import axios from 'axios';

const defaultProfile = {
  username: null,
  displayName: null,
  picture: null,
  bearerToken: null
};

@datasource(ProfileSource)
class ProfileStore {
  constructor() {
    this.bindActions(ProfileActions);

    this.profile = defaultProfile;
  }

  fetching = () => {
    console.log('profile store : fetching');
  };
  fetchSuccess = (response) => {
    this.updateProfile(response.data);
    console.log(response.data);
  };
  fetchFailed = (errorMessage) => {
    console.log(`profile store : fetchFailed due to "${errorMessage}"`);
  };

  login(accessToken) {
    axios.post('http://api.server.dev:3000/v1/login/facebook', {
      'access_token': accessToken
    }).then((response) => {
      const { token } = response.data;

      this.updateBearerToken(token);

      return axios({
        url: 'http://api.server.dev:3000/v1/users/me',
        method: 'get',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }).then((response) => {
      const { username, displayName, picture, position } = response.data;
      const profile = { username, displayName, picture, position };

      this.updateProfile(profile);
    }).catch(function(response) {
      console.log(response);
    });
  }

  updateBearerToken(token) {
    let profile = this.profile;
    profile.bearerToken = token;

    this.setState(profile);
  }

  updateProfile(newProfile) {
    // TODO: any check and/or ops

    const { username, displayName, picture, position } = newProfile;
    const profile = this.profile;

    profile.username = username;
    profile.displayName = displayName;
    profile.picture = picture;
    profile.position = position;

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
}

export default alt.createStore(ProfileStore, 'ProfileStore');

import alt from '../libs/alt';
import ProfileActions from '../actions/ProfileActions';
import ProfileSource from '../sources/ProfileSource';
import { datasource } from 'alt-utils/lib/decorators';

const defaultProfile = {
  id: null,
  name: null,
  picture: null,
  accessToken: null
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
    this.login(response.data);
  };
  fetchFailed = (errorMessage) => {
    console.log(`profile store : fetchFailed due to "${errorMessage}"`);
  };

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
}

export default alt.createStore(ProfileStore, 'ProfileStore');

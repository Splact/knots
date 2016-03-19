import axios from 'axios';
import ProfileActions from '../actions/ProfileActions';

export default {
  performFetch: {
    // remotely fetch profile (required)
    remote() {
      return axios.get('http://api.arrray.com/m1Jvn01_b'); // TEMP
    },

    // this function checks in our local cache first
    // if the value is present it'll use that instead (optional).
    local(state) {
      return state.profile ? state.profile : null;
    },

    // here we setup some actions to handle our response
    // (optional)
    loading: ProfileActions.fetching,
    // (required)
    success: ProfileActions.fetchSuccess,
    // (required)
    error: ProfileActions.fetchFailed,

    // should fetch has precedence over the value returned by local in
    // determining whether remote should be called
    // in this particular example if the value is present locally it
    // would return but still fire off the remote request (optional)
    shouldFetch() {
      return true;
    }
  }
};

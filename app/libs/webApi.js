import axios from 'axios';
import config from '../constants/config';
import ProfileActions from '../actions/ProfileActions';

/*
 * The API will dispatch actions once the request returns.
 */

// Defining Services constants
export const FACEBOOK_LOGIN = 101;
export const CURRENT_USER = 102;

class WebApi {

  constructor(config) {
    this.$ = axios.create(config);
  }

  _handleError(response) {
    console.log(response);
  }

  facebookLogin(params) {
    const { accessToken } = params;

    this.$.request({
      url: '/login/facebook',
      method: 'post',
      data: {
        'access_token': accessToken
      }
    }).then((response) => {
      const { token } = response.data;

      ProfileActions.updateBearerToken(token);
    }).catch(this._handleError);
  }

  getCurrentUser(params) {
    const { bearerToken } = params;

    this.$.request({
      url: '/users/me',
      method: 'get',
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    }).then((response) => {
      ProfileActions.updateProfile(response.data);
    }).catch(this._handleError);
  }
}

const apiConfig = config.api;
const webApiInstance = new WebApi({
  baseURL: apiConfig.baseURL
});

export const webApi = function(service, params) {
  // TODO: manage priority

  if (service === FACEBOOK_LOGIN) {
    webApiInstance.facebookLogin(params);
  } else if (service === CURRENT_USER) {
    webApiInstance.getCurrentUser(params);
  } else {
    console.error('[WebApi] No service corresponding to given key.');
  }
};

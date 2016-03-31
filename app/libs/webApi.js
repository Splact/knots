import axios from 'axios';
import config from '../constants/config';
import ProfileActions from '../actions/ProfileActions';
import SearchActions from '../actions/SearchActions';

/*
 * The API will dispatch actions once the request returns.
 */

// Defining Services constants
export const FACEBOOK_LOGIN = 101;
export const CURRENT_USER = 102;
export const UPDATE_USER_POSITION = 103;
export const LOGOUT = 104;
export const UPDATE_BEARERTOKEN = 105;
export const SEARCH_TOPICS = 106;

class WebApi {

  constructor(config) {
    this.$ = axios.create(config);
    this.bearerToken = null;
  }

  _handleError(response) {
    console.log(response);
  }

  updateBearerToken(bearerToken) {
    // Alter defaults after instance has been created
    this.$.defaults = Object.assign(this.$.defaults, {
      headers: {
        common: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    });

    this.bearerToken = bearerToken;
  }

  facebookLogin({ accessToken }) {
    this.$.request({
      url: '/login/facebook',
      method: 'post',
      data: {
        'access_token': accessToken
      }
    }).then(({ data }) => {
      ProfileActions.loginSuccess(data);
    }).catch(this._handleError);
  }

  searchTopics({ q }) {
    this.$.request({
      url: '/search/topics',
      method: 'get',
      params: { q }
    }).then(({ data }) => {
      SearchActions.searchTopicsSuccess(data);
    }).catch(this._handleError);
  }

  logout() {
    this.bearerToken = null;
    delete this.$.defaults.headers.common.Authorization;
  }

  fetchCurrentUser() {
    this.$.request({
      url: '/users/me',
      method: 'get'
    }).then(({ data }) => {
      ProfileActions.fetchUserSuccess(data);
    }).catch(this._handleError);
  }

  updateUserPosition({ position }) {
    // TODO: validate position

    if (!this.bearerToken) {
      return false;
    }

    this.$.request({
      url: '/users/position',
      method: 'put',
      data: { position }
    }).then((response) => {
      ProfileActions.updatePositionSuccess(response.data);
    }).catch(this._handleError);
  }
}

const apiConfig = config.api;
const webApiInstance = new WebApi({
  baseURL: apiConfig.baseURL
});

export const webApi = function(service, params) {
  // TODO: manage priority
  console.log({ webApiInstance, service, params });

  if (service === FACEBOOK_LOGIN) {
    webApiInstance.facebookLogin(params);
  } else if (service === CURRENT_USER) {
    webApiInstance.fetchCurrentUser(params);
  } else if (service === UPDATE_USER_POSITION) {
    webApiInstance.updateUserPosition(params);
  } else if (service === UPDATE_BEARERTOKEN) {
    webApiInstance.updateBearerToken(params.bearerToken);
  } else if (service === SEARCH_TOPICS) {
    webApiInstance.searchTopics(params);
  } else if (service === LOGOUT) {
    webApiInstance.logout(params);
  } else {
    console.error('[WebApi] No service corresponding to given key.');
  }
};

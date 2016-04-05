import axios from 'axios';
import config from '../constants/config';
import ProfileActions from '../actions/ProfileActions';
import SearchActions from '../actions/SearchActions';
import TopicActions from '../actions/TopicActions';

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
export const DO_TOPIC_CHECKIN = 107;
export const UNDO_TOPIC_CHECKIN = 108;
export const READ_TOPIC = 109;
export const CREATE_TOPIC = 110;

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

  readTopic({ tag }) {
    this.$.request({
      url: `/topics/${tag}/checkins`,
      method: 'get'
    }).then(({ data }) => {
      TopicActions.readSuccess({ ...data, tag });
    }).catch(this._handleError);
  }

  createTopic({ tag }) {
    this.$.request({
      url: `/topics`,
      method: 'post',
      data: { tag }
    }).then(({ data }) => {
      TopicActions.createSuccess({ ...data, tag });
    }).catch(this._handleError);
  }

  logout() {
    this.bearerToken = null;
    delete this.$.defaults.headers.common.Authorization;
  }

  readCurrentUser() {
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
    }).then(({ data }) => {
      ProfileActions.updatePositionSuccess(data);
    }).catch(this._handleError);
  }

  doTopicCheckin({ tag }) {
    if (!this.bearerToken) {
      return false;
    }

    this.$.request({
      url: `/topics/${tag}/checkins`,
      method: 'put'
    }).then(() => {
      TopicActions.doCheckinSuccess();
    }).catch(this._handleError);
  }

  undoTopicCheckin({ tag }) {
    if (!this.bearerToken) {
      return false;
    }

    this.$.request({
      url: `/topics/${tag}/checkins`,
      method: 'delete'
    }).then(() => {
      TopicActions.undoCheckinSuccess();
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
    webApiInstance.readCurrentUser(params);
  } else if (service === UPDATE_USER_POSITION) {
    webApiInstance.updateUserPosition(params);
  } else if (service === UPDATE_BEARERTOKEN) {
    webApiInstance.updateBearerToken(params.bearerToken);
  } else if (service === SEARCH_TOPICS) {
    webApiInstance.searchTopics(params);
  } else if (service === READ_TOPIC) {
    webApiInstance.readTopic(params);
  } else if (service === DO_TOPIC_CHECKIN) {
    webApiInstance.doTopicCheckin(params);
  } else if (service === UNDO_TOPIC_CHECKIN) {
    webApiInstance.undoTopicCheckin(params);
  } else if (service === CREATE_TOPIC) {
    webApiInstance.createTopic(params);
  } else if (service === LOGOUT) {
    webApiInstance.logout(params);
  } else {
    console.error('[WebApi] No service corresponding to given key.');
  }
};

import axios from 'axios';
import config from '../constants/config';

class WebApi {

  constructor(config) {
    this.$ = axios.create(config);
    this.bearerToken = null;
  }

  _errorHandler(response) {
    let error;
    if (response instanceof Error) {
      error = {status: 500, message: response.message};
    } else {
      error = {status: response.status, message: response.data.message};
    }
    throw error;
  }

  updateBearerToken = ({ token }) => {
    const self = this;
    return new Promise((resolve, reject) => {
      try {
        // Alter defaults after instance has been created
        self.$.defaults = Object.assign(self.$.defaults, {
          headers: {
            common: {
              'Authorization': `Bearer ${token}`
            }
          }
        });

        self.bearerToken = token;
        resolve({status: 200, data: {}});
      } catch (e) {
        reject(e);
      }
    }).catch (this._errorHandler);
  };

  facebookLogin = ({ accessToken }) => {
    return this.$.request({
      url: '/login/facebook',
      method: 'post',
      data: {
        'access_token': accessToken
      }
    }).then((response) => {
      this.updateBearerToken(response.data.token);
      return response;
    }).catch (this._errorHandler);
  };

  searchTopics = ({ q }) => {
    return this.$.request({
      url: '/search/topics',
      method: 'get',
      params: { q }
    }).catch (this._errorHandler);
  };

  logout = () => {
    const self = this;
    return new Promise((resolve, reject) => {
      try {
        this.bearerToken = null;
        delete self.$.defaults.headers.common.Authorization;
        resolve({status: 200, data: {}});
      } catch (e) {
        reject(e);
      }
    }).catch (this._errorHandler);
  };

  userFetch = ({ username }) => {
    const url = (!username) ? '/users/me' : `/users/${username}`;

    return this.$.request({
      url,
      method: 'get'
    }).catch (this._errorHandler);
  };

  userUpdatePosition = ({ position }) => {
    return this.$.request({
      url: '/users/position',
      method: 'put',
      data: { position }
    }).catch (this._errorHandler);
  };

  topicFetchCheckins = ({ tag }) => {
    return this.$.request({
      url: `/topics/${tag}/checkins`,
      method: 'get'
    }).catch (this._errorHandler);
  };

  topicCreate = ({ tag }) => {
    return this.$.request({
      url: `/topics`,
      method: 'post',
      data: { tag }
    }).catch (this._errorHandler);
  };

  topicDoCheckin = ({ tag }) => {
    return this.$.request({
      url: `/topics/${tag}/checkins`,
      method: 'put'
    }).catch (this._errorHandler);
  };

  topicUndoCheckin = ({ tag }) => {
    return this.$.request({
      url: `/topics/${tag}/checkins`,
      method: 'delete'
    }).catch (this._errorHandler);
  };
}

const apiConfig = config.api;
export default new WebApi({
  baseURL: apiConfig.baseURL
});

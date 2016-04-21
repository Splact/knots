import axios from 'axios';
import config from '../constants/config';

class WebApi {

  constructor(config) {
    this.$ = axios.create(config);
    this.bearerToken = null;
  }

  _responseHandler(response) {
    return response.data;
  }
  _errorHandler(response) {
    let error;

    if (response instanceof Error) {
      error = {
        status: 500,
        message: response.message
      };
    } else if (!response) {
      error = {
        status: 500,
        message: 'No response received.'
      };
    } else if (response.status >= 400) {
      error = {
        status: response.status,
        message: response.data.message
      };
    }

    throw error;
  }

  _needToken = () => {
    const token = this.bearerToken;
    return new Promise((resolve, reject) => {
      if (token) {
        resolve({status: 200, data: {}});
      } else {
        reject(new Error('Authentication required.'));
      }
    });
  };

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
    }).then(this._responseHandler).catch (this._errorHandler);
  };

  facebookLogin = ({ accessToken }) => {
    return this.$.request({
      url: '/login/facebook',
      method: 'post',
      data: {
        'access_token': accessToken
      }
    }).then((response) => {
      this.updateBearerToken({ token: response.data.token });
      return response;
    }).then(this._responseHandler).catch (this._errorHandler);
  };

  searchTopics = ({ q }) => {
    return this.$.request({
      url: '/search/topics',
      method: 'get',
      params: { q }
    }).then(this._responseHandler).catch (this._errorHandler);
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
    }).then(this._responseHandler).catch (this._errorHandler);
  };

  userFetch = ({ username }) => {
    if (!username) {
      return this._needToken().then(() => {
        return this.$.request({
          url: '/users/me',
          method: 'get'
        });
      }).then(this._responseHandler).catch (this._errorHandler);
    } else {
      return this.$.request({
        url: `/users/${username}`,
        method: 'get'
      }).then(this._responseHandler).catch (this._errorHandler);
    }
  };

  userUpdatePosition = ({ position }) => {
    return this._needToken().then(() => {
      return this.$.request({
        url: '/users/position',
        method: 'put',
        data: { position }
      });
    }).then(this._responseHandler).catch (this._errorHandler);
  };

  topicFetchCheckins = ({ tag }) => {
    return this.$.request({
      url: `/topics/${tag}/checkins`,
      method: 'get'
    }).then(this._responseHandler).catch (this._errorHandler);
  };

  topicCreate = ({ tag }) => {
    return this._needToken().then(() => {
      return this.$.request({
        url: `/topics`,
        method: 'post',
        data  : {tag}
      });
    }).then(this._responseHandler).catch (this._errorHandler);
  };

  topicDoCheckin = ({ tag }) => {
    return this._needToken().then(() => {
      return this.$.request({
        url: `/topics/${tag}/checkins`,
        method: 'put'
      });
    }).then(this._responseHandler).catch (this._errorHandler);
  };

  topicUndoCheckin = ({ tag }) => {
    return this._needToken().then(() => {
      return this.$.request({
        url: `/topics/${tag}/checkins`,
        method: 'delete'
      });
    }).then(this._responseHandler).catch (this._errorHandler);
  };
}

const apiConfig = config.api;
export default new WebApi({
  baseURL: apiConfig.baseURL
});

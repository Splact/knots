import axios from 'axios';
import config from '../constants/config';

class WebApi {

  constructor(axiosConfig) {
    this.$ = axios.create(axiosConfig);
    this.bearerToken = null;
  }

  responseHandler(response) {
    return response.data;
  }
  errorHandler(response) {
    let error;

    if (response instanceof Error) {
      error = {
        status: 500,
        message: response.message,
      };
    } else if (!response) {
      error = {
        status: 500,
        message: 'No response received.',
      };
    } else if (response.status >= 400) {
      error = {
        status: response.status,
        message: response.data.message,
      };
    }

    throw error;
  }

  needToken = () => {
    const token = this.bearerToken;
    return new Promise((resolve, reject) => {
      if (token) {
        resolve({ status: 200, data: {} });
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
              Authorization: `Bearer ${token}`,
            },
          },
        });

        self.bearerToken = token;
        resolve({ status: 200, data: {} });
      } catch (e) {
        reject(e);
      }
    }).then(this.responseHandler).catch(this.errorHandler);
  };

  facebookLogin = ({ accessToken }) => this.$.request({
    url: '/login/facebook',
    method: 'post',
    data: {
      access_token: accessToken,
    },
  }).then((response) => {
    this.updateBearerToken({ token: response.data.token });
    return response;
  }).then(this.responseHandler)
    .catch(this.errorHandler);

  searchTopics = ({ q }) => this.$.request({
    url: '/search/topics',
    method: 'get',
    params: { q },
  }).then(this.responseHandler)
    .catch(this.errorHandler);

  logout = () => {
    const self = this;
    return new Promise((resolve, reject) => {
      try {
        this.bearerToken = null;
        delete self.$.defaults.headers.common.Authorization;
        resolve({ status: 200, data: {} });
      } catch (e) {
        reject(e);
      }
    })
      .then(this.responseHandler)
      .catch(this.errorHandler);
  };

  userFetch = ({ username }) => {
    if (!username) {
      return this.needToken().then(() => this.$.request({
        url: '/users/me',
        method: 'get',
      }))
        .then(this.responseHandler)
        .catch(this.errorHandler);
    }
    return this.$.request({
      url: `/users/${username}`,
      method: 'get',
    }).then(this.responseHandler).catch(this.errorHandler);
  };

  userUpdatePosition = ({ position }) => this.needToken().then(() => this.$.request({
    url: '/users/position',
    method: 'put',
    data: { position },
  }))
    .then(this.responseHandler)
    .catch(this.errorHandler);

  topicFetchCheckins = ({ tag }) => this.$.request({
    url: `/topics/${tag}/checkins`,
    method: 'get',
  })
    .then(this.responseHandler)
    .catch(this.errorHandler);

  topicCreate = ({ tag }) => this.needToken().then(() => this.$.request({
    url: '/topics',
    method: 'post',
    data: { tag },
  }))
    .then(this.responseHandler)
    .catch(this.errorHandler);

  topicDoCheckin = ({ tag }) => this.needToken().then(() => this.$.request({
    url: `/topics/${tag}/checkins`,
    method: 'put',
  }))
    .then(this.responseHandler)
    .catch(this.errorHandler);

  topicUndoCheckin = ({ tag }) => this.needToken().then(() => this.$.request({
    url: `/topics/${tag}/checkins`,
    method: 'delete',
  }))
    .then(this.responseHandler)
    .catch(this.errorHandler);
}

const apiConfig = config.api;
export default new WebApi({
  baseURL: apiConfig.baseURL,
});

import { handleActions } from 'redux-actions';
import {
  USER_LOGIN_REQUESTED,
  USER_LOGIN_SUCCEEDED,
  USER_LOGIN_FAILED,
  USER_LOGOUT_REQUESTED,
  USER_LOGOUT_SUCCEEDED,
  USER_LOGOUT_FAILED,
  USER_FETCH_REQUESTED,
  USER_FETCH_SUCCEEDED,
  USER_FETCH_FAILED,
  USER_UPDATE_POSITION_REQUESTED,
  USER_UPDATE_POSITION_SUCCEEDED,
  USER_UPDATE_POSITION_FAILED,
} from '../actions/types';

const defaultState = {
  username: null,
  displayName: null,
  picture: null,
  position: null,
  token: null,
  isLogged: false,

  // waiting states
  isLoggingIn: false,
  isLoggingOut: false,
  isFetching: false,
  isUpdatingPosition: false,

  // error state
  error: null,
};

const reducerMap = {
  [USER_LOGIN_REQUESTED]: (state) => Object.assign({}, state, { isLoggingIn: true }),
  [USER_LOGIN_SUCCEEDED]: (state, action) => Object.assign({}, state, {
    token: action.payload,
    isLogged: true,
    isLoggingIn: false,
  }),
  [USER_LOGIN_FAILED]: (state, action) => Object.assign({}, state, {
    isLoggingIn: false,
    error: action.payload,
  }),
  [USER_LOGOUT_REQUESTED]: (state) => Object.assign({}, state, { isLoggingOut: true }),
  [USER_LOGOUT_SUCCEEDED]: (state) => Object.assign({}, state, {
    token: null,
    isLogged: false,
    isLoggingOut: false,
  }),
  [USER_LOGOUT_FAILED]: (state, action) => Object.assign({}, state, {
    isLoggingOut: false,
    error: action.payload,
  }),
  [USER_FETCH_REQUESTED]: (state) => Object.assign({}, state, { isFetching: true }),
  [USER_FETCH_SUCCEEDED]: (state, action) => {
    const { username, displayName, picture, position } = action.payload;

    return Object.assign({}, state, {
      username,
      displayName,
      picture,
      position,
      isFetching: false,
    });
  },
  [USER_FETCH_FAILED]: (state, action) => Object.assign({}, state, {
    isFetching: false,
    error: action.payload,
  }),
  [USER_UPDATE_POSITION_REQUESTED]: (state) => Object.assign({}, state, {
    isUpdatingPosition: true,
  }),
  [USER_UPDATE_POSITION_SUCCEEDED]: (state, action) => Object.assign({}, state, {
    position: action.payload,
    isUpdatingPosition: false,
  }),
  [USER_UPDATE_POSITION_FAILED]: (state, action) => Object.assign({}, state, {
    isUpdatingPosition: false,
    error: action.payload,
  }),
};

export default handleActions(reducerMap, defaultState);

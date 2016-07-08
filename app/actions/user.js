import { createAction } from 'redux-actions';
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
} from './types';

export const login = createAction(USER_LOGIN_REQUESTED, token => token);
export const loginSucceeded = createAction(USER_LOGIN_SUCCEEDED, token => token);
export const loginFailed = createAction(USER_LOGIN_FAILED, error => error);

export const logout = createAction(USER_LOGOUT_REQUESTED);
export const logoutSucceeded = createAction(USER_LOGOUT_SUCCEEDED);
export const logoutFailed = createAction(USER_LOGOUT_FAILED, error => error);

export const fetch = createAction(USER_FETCH_REQUESTED);
export const fetchSucceeded = createAction(USER_FETCH_SUCCEEDED, user => user);
export const fetchFailed = createAction(USER_FETCH_FAILED, error => error);

export const updatePosition = createAction(USER_UPDATE_POSITION_REQUESTED, position => position);
export const updatePositionSucceeded = createAction(USER_UPDATE_POSITION_SUCCEEDED);
export const updatePositionFailed = createAction(USER_UPDATE_POSITION_FAILED, error => error);

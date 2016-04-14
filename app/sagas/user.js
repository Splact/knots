import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  USER_LOGIN_REQUESTED,
  USER_LOGOUT_REQUESTED,
  USER_UPDATE_POSITION_REQUESTED,
  USER_FETCH_REQUESTED
} from '../actions/types';
import {
  loginSucceeded,
  loginFailed,
  logoutSucceeded,
  logoutFailed,
  updatePositionSucceeded,
  updatePositionFailed,
  fetch,
  fetchSucceeded,
  fetchFailed
} from '../actions/user';
import webApiSaga from './webApiSaga';

// Worker Saga : will be fired on USER_LOGIN_REQUESTED actions
const userLogin = function*(action) {
  // Using facebook access token try to login user retrieving a bearer token for the following requests
  const userLoginParams = { accessToken: action.payload };
  const { error, token } = yield call(webApiSaga, 'facebookLogin', userLoginParams);

  if (!error) {
    // Set the user logged and save the token into the store
    yield put(loginSucceeded(token));

    // Fetch user
    yield put(fetch());
  } else {
    yield put(loginFailed(error));
  }
};

// Worker Saga : will be fired on USER_LOGOUT_REQUESTED actions
const userLogout = function*() {
  // Logout the user
  const { error } = yield call(webApiSaga, 'logout');

  if (!error) {
    // Set the user as not logged and delete the token from the store
    yield put(logoutSucceeded());
  } else {
    yield put(logoutFailed(error));
  }
};

// Worker Saga : will be fired on USER_UPDATE_POSITION_REQUESTED actions
const userUpdatePosition = function*(action) {
  // Update remote user position
  const userUpdatePositionParams = { position: action.payload };
  const { error } = yield call(webApiSaga, 'userUpdatePosition', userUpdatePositionParams);
  if (!error) {
    // Update store user position
    yield put(updatePositionSucceeded(action.payload));
  } else {
    yield put(updatePositionFailed(error));
  }
};

// Worker Saga : will be fired on USER_FETCH_REQUESTED actions
const userFetch = function*(action) {
  // Fetch user
  const userFetchParams = { position: action.payload };
  const { error, ...fetchedUser } = yield call(webApiSaga, 'userFetch', userFetchParams);
  if (!error) {
    // Update store user position
    yield put(fetchSucceeded(fetchedUser));
  } else {
    yield put(fetchFailed(error));
  }
};

// Watchers Sagas
export const userLoginSaga = function*() {
  yield* takeLatest(USER_LOGIN_REQUESTED, userLogin);
};
export const userLogoutSaga = function*() {
  yield* takeLatest(USER_LOGOUT_REQUESTED, userLogout);
};
export const userUpdatePositionSaga = function*() {
  yield* takeLatest(USER_UPDATE_POSITION_REQUESTED, userUpdatePosition);
};
export const userFetchSaga = function*() {
  yield* takeLatest(USER_FETCH_REQUESTED, userFetch);
};

export default [
  userLoginSaga,
  userLogoutSaga,
  userUpdatePositionSaga,
  userFetchSaga
];

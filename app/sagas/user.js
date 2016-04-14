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
  try {
    // Using facebook access token try to login user retrieving a bearer token for the following requests
    const userLoginParams = { accessToken: action.payload };
    const { token } = yield call(webApiSaga, 'facebookLogin', userLoginParams);

    // Fetch user
    yield put(fetch());

    // Set the user logged and save the token into the store
    yield put(loginSucceeded(token));
  } catch (e) {
    yield put(loginFailed(e));
  }
};

// Worker Saga : will be fired on USER_LOGOUT_REQUESTED actions
const userLogout = function*() {
  try {
    // Logout the user
    yield call(webApiSaga, 'logout');

    // Set the user as not logged and delete the token from the store
    yield put(logoutSucceeded());
  } catch (e) {
    yield put(logoutFailed(e));
  }
};

// Worker Saga : will be fired on USER_UPDATE_POSITION_REQUESTED actions
const userUpdatePosition = function*(action) {
  try {
    // Update remote user position
    const userUpdatePositionParams = { position: action.payload };
    yield call(webApiSaga, 'userUpdatePosition', userUpdatePositionParams);
    // Update store user position
    yield put(updatePositionSucceeded(action.payload));
  } catch (e) {
    yield put(updatePositionFailed(e));
  }
};

// Worker Saga : will be fired on USER_FETCH_REQUESTED actions
const userFetch = function*(action) {
  try {
    // Fetch user
    const userFetchParams = { position: action.payload };
    const fetchedUser = yield call(webApiSaga, 'userFetch', userFetchParams);
    // Update store user position
    yield put(fetchSucceeded(fetchedUser));
  } catch (e) {
    yield put(fetchFailed(e));
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

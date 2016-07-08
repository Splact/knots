import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  USER_LOGIN_REQUESTED,
  USER_LOGOUT_REQUESTED,
  USER_UPDATE_POSITION_REQUESTED,
  USER_FETCH_REQUESTED,
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
  fetchFailed,
} from '../actions/user';
import webApi from '../libs/webApi';

// Worker Saga : will be fired on USER_LOGIN_REQUESTED actions
const userLogin = function* userLogin(action) {
  try {
    // Using facebook access token try to login user retrieving a bearer token for the following
    // requests
    const userLoginParams = { accessToken: action.payload };
    const { token } = yield call(webApi.facebookLogin, userLoginParams);

    // Set the user logged and save the token into the store
    yield put(loginSucceeded(token));

    // Fetch user
    yield put(fetch());
  } catch (error) {
    yield put(loginFailed(error));
  }
};

// Worker Saga : will be fired on USER_LOGOUT_REQUESTED actions
const userLogout = function* userLogout() {
  try {
    // Logout the user
    yield call(webApi.logout);

    // Set the user as not logged and delete the token from the store
    yield put(logoutSucceeded());
  } catch (error) {
    yield put(logoutFailed(error));
  }
};

// Worker Saga : will be fired on USER_UPDATE_POSITION_REQUESTED actions
const userUpdatePosition = function* userUpdatePosition(action) {
  try {
    // Update remote user position
    const userUpdatePositionParams = { position: action.payload };
    yield call(webApi.userUpdatePosition, userUpdatePositionParams);

    // Update store user position
    yield put(updatePositionSucceeded(action.payload));
  } catch (error) {
    yield put(updatePositionFailed(error));
  }
};

// Worker Saga : will be fired on USER_FETCH_REQUESTED actions
const userFetch = function* userFetch(action) {
  try {
    // Fetch user
    const userFetchParams = { position: action.payload };
    const { ...fetchedUser } = yield call(webApi.userFetch, userFetchParams);

    // Update store user position
    yield put(fetchSucceeded(fetchedUser));
  } catch (error) {
    yield put(fetchFailed(error));
  }
};

// Watchers Sagas
export const userLoginSaga = function* userLoginSaga() {
  yield* takeLatest(USER_LOGIN_REQUESTED, userLogin);
};
export const userLogoutSaga = function* userLogoutSaga() {
  yield* takeLatest(USER_LOGOUT_REQUESTED, userLogout);
};
export const userUpdatePositionSaga = function* userUpdatePositionSaga() {
  yield* takeLatest(USER_UPDATE_POSITION_REQUESTED, userUpdatePosition);
};
export const userFetchSaga = function* userFetchSaga() {
  yield* takeLatest(USER_FETCH_REQUESTED, userFetch);
};

export default [
  userLoginSaga,
  userLogoutSaga,
  userUpdatePositionSaga,
  userFetchSaga,
];

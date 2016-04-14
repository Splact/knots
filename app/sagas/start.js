import { takeLatest } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { REDUX_STORAGE_LOAD } from '../actions/types';
import webApiSaga from './webApiSaga';

// Worker Saga : will be fired on REDUX_STORAGE_LOAD actions
const userUpdateToken = function*(action) {
  if ((action.payload) && (action.payload.user)) {
    // Update bearer token for api calls
    const updateBearerTokenParams = {token: action.payload.user.token};
    yield call(webApiSaga, 'updateBearerToken', updateBearerTokenParams);
  }
};

// Watchers Sagas
export const reduxStorageLoadSaga = function*() {
  yield* takeLatest(REDUX_STORAGE_LOAD, userUpdateToken);
};

export default [
  reduxStorageLoadSaga
];

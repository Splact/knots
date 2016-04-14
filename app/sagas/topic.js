import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  TOPIC_FETCH_REQUESTED,
  TOPIC_CREATE_REQUESTED,
  TOPIC_DO_CHECKIN_REQUESTED,
  TOPIC_UNDO_CHECKIN_REQUESTED
} from '../actions/types';
import {
  createSucceeded,
  createFailed,
  fetchSucceeded,
  fetchFailed,
  doCheckinSucceeded,
  doCheckinFailed,
  undoCheckinSucceeded,
  undoCheckinFailed
} from '../actions/topic';
import webApiSaga from './webApiSaga';

// Worker Saga : will be fired on TOPIC_FETCH_REQUESTED actions
const topicFetch = function*(action) {
  // Fetch topic
  const topicFetchCheckinsParams = { tag: action.payload };
  const { error, checkins } = yield call(webApiSaga, 'topicFetchCheckins', topicFetchCheckinsParams);

  if (!error) {
    // Update store topic
    yield put(fetchSucceeded({
      tag: action.payload,
      checkins
    }));
  } else {
    yield put(fetchFailed(error));
  }
};

// Worker Saga : will be fired on TOPIC_CREATE_REQUESTED actions
const topicCreate = function*(action) {
  // Create topic
  const topicCreateParams = { tag: action.payload };
  const { error, ...topic } = yield call(webApiSaga, 'topicCreate', topicCreateParams);

  if (!error) {
    // Update store topic
    yield put(createSucceeded(topic));
  } else {
    yield put(createFailed(error));
  }
};

// Worker Saga : will be fired on TOPIC_DO_CHECKIN_REQUESTED actions
const topicDoCheckin = function*(action) {
  // Do Checkin
  const topicDoCheckinParams = { tag: action.payload };
  const { error, checkins } = yield call(webApiSaga, 'topicDoCheckin', topicDoCheckinParams);

  if (!error) {
    // Update store topic
    yield put(doCheckinSucceeded(checkins));
  } else {
    yield put(doCheckinFailed(error));
  }
};

// Worker Saga : will be fired on TOPIC_UNDO_CHECKIN_REQUESTED actions
const topicUndoCheckin = function*(action) {
  // Undo Checkin
  const topicUndoCheckinParams = { tag: action.payload };
  const { error, checkins } = yield call(webApiSaga, 'topicUndoCheckin', topicUndoCheckinParams);

  if (!error) {
    // Update store topic
    yield put(undoCheckinSucceeded(checkins));
  } else {
    yield put(undoCheckinFailed(error));
  }
};

// Watchers Sagas
export const topicFetchSaga = function*() {
  yield* takeLatest(TOPIC_FETCH_REQUESTED, topicFetch);
};
export const topicCreateSaga = function*() {
  yield* takeLatest(TOPIC_CREATE_REQUESTED, topicCreate);
};
export const topicDoCheckinSaga = function*() {
  yield* takeLatest(TOPIC_DO_CHECKIN_REQUESTED, topicDoCheckin);
};
export const topicUndoCheckinSaga = function*() {
  yield* takeLatest(TOPIC_UNDO_CHECKIN_REQUESTED, topicUndoCheckin);
};

export default [
  topicFetchSaga,
  topicCreateSaga,
  topicDoCheckinSaga,
  topicUndoCheckinSaga
];

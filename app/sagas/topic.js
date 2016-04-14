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
  try {
    // Fetch topic
    const topicFetchCheckinsParams = { tag: action.payload };
    const { checkins } = yield call(webApiSaga, 'topicFetchCheckins', topicFetchCheckinsParams);
    // Update store topic
    yield put(fetchSucceeded({
      tag: action.payload,
      checkins
    }));
  } catch (e) {
    yield put(fetchFailed(e));
  }
};

// Worker Saga : will be fired on TOPIC_CREATE_REQUESTED actions
const topicCreate = function*(action) {
  try {
    // Create topic
    const topicCreateParams = { tag: action.payload };
    const topic = yield call(webApiSaga, 'topicCreate', topicCreateParams);
    // Update store topic
    yield put(createSucceeded(topic));
  } catch (e) {
    yield put(createFailed(e));
  }
};

// Worker Saga : will be fired on TOPIC_DO_CHECKIN_REQUESTED actions
const topicDoCheckin = function*(action) {
  try {
    // Do Checkin
    const topicDoCheckinParams = { tag: action.payload };
    const { checkins } = yield call(webApiSaga, 'topicDoCheckin', topicDoCheckinParams);
    // Update store topic
    yield put(doCheckinSucceeded(checkins));
  } catch (e) {
    yield put(doCheckinFailed(e));
  }
};

// Worker Saga : will be fired on TOPIC_UNDO_CHECKIN_REQUESTED actions
const topicUndoCheckin = function*(action) {
  try {
    // Undo Checkin
    const topicUndoCheckinParams = { tag: action.payload };
    const { checkins } = yield call(webApiSaga, 'topicUndoCheckin', topicUndoCheckinParams);
    // Update store topic
    yield put(undoCheckinSucceeded(checkins));
  } catch (e) {
    yield put(undoCheckinFailed(e));
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

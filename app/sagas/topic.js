import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  TOPIC_FETCH_REQUESTED,
  TOPIC_CREATE_REQUESTED,
  TOPIC_DO_CHECKIN_REQUESTED,
  TOPIC_UNDO_CHECKIN_REQUESTED,
} from '../actions/types';
import {
  createSucceeded,
  createFailed,
  fetchSucceeded,
  fetchFailed,
  doCheckinSucceeded,
  doCheckinFailed,
  undoCheckinSucceeded,
  undoCheckinFailed,
} from '../actions/topic';
import webApi from '../libs/webApi';

// Worker Saga : will be fired on TOPIC_FETCH_REQUESTED actions
const topicFetch = function* topicFetch(action) {
  try {
    // Fetch topic
    const topicFetchCheckinsParams = { tag: action.payload };
    const { checkins } = yield call(webApi.topicFetchCheckins, topicFetchCheckinsParams);

    // Update store topic
    yield put(fetchSucceeded({
      tag: action.payload,
      checkins,
    }));
  } catch (error) {
    yield put(fetchFailed(error));
  }
};

// Worker Saga : will be fired on TOPIC_CREATE_REQUESTED actions
const topicCreate = function* topicCreate(action) {
  try {
    // Create topic
    const topicCreateParams = { tag: action.payload };
    const { checkins } = yield call(webApi.topicCreate, topicCreateParams);

    // Update store topic
    yield put(createSucceeded({
      tag: action.payload,
      checkins,
    }));
  } catch (error) {
    yield put(createFailed(error));
  }
};

// Worker Saga : will be fired on TOPIC_DO_CHECKIN_REQUESTED actions
const topicDoCheckin = function* topicDoCheckin(action) {
  try {
    // Do Checkin
    const topicDoCheckinParams = { tag: action.payload };
    const { checkins } = yield call(webApi.topicDoCheckin, topicDoCheckinParams);

    // Update store topic
    yield put(doCheckinSucceeded(checkins));
  } catch (error) {
    yield put(doCheckinFailed(error));
  }
};

// Worker Saga : will be fired on TOPIC_UNDO_CHECKIN_REQUESTED actions
const topicUndoCheckin = function* topicUndoCheckin(action) {
  try {
    // Undo Checkin
    const topicUndoCheckinParams = { tag: action.payload };
    const { checkins } = yield call(webApi.topicUndoCheckin, topicUndoCheckinParams);

    // Update store topic
    yield put(undoCheckinSucceeded(checkins));
  } catch (error) {
    yield put(undoCheckinFailed(error));
  }
};

// Watchers Sagas
export const topicFetchSaga = function* topicFetchSaga() {
  yield* takeLatest(TOPIC_FETCH_REQUESTED, topicFetch);
};
export const topicCreateSaga = function* topicCreateSaga() {
  yield* takeLatest(TOPIC_CREATE_REQUESTED, topicCreate);
};
export const topicDoCheckinSaga = function* topicDoCheckinSaga() {
  yield* takeLatest(TOPIC_DO_CHECKIN_REQUESTED, topicDoCheckin);
};
export const topicUndoCheckinSaga = function* topicUndoCheckinSaga() {
  yield* takeLatest(TOPIC_UNDO_CHECKIN_REQUESTED, topicUndoCheckin);
};

export default [
  topicFetchSaga,
  topicCreateSaga,
  topicDoCheckinSaga,
  topicUndoCheckinSaga,
];

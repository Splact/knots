import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  SEARCH_TOPICS_REQUESTED
} from '../actions/types';
import {
  searchTopicsSucceeded,
  searchTopicsFailed
} from '../actions/search';
import webApiSaga from './webApiSaga';

// Worker Saga : will be fired on SEARCH_TOPICS_REQUESTED actions
const searchTopics = function*(action) {
  try {
    // Do search
    const searchTopicsParams = { q: action.payload };
    const { results } = yield call(webApiSaga, 'searchTopics', searchTopicsParams);
    // Update store search results
    yield put(searchTopicsSucceeded({ results, query: action.payload }));
  } catch (e) {
    yield put(searchTopicsFailed(e));
  }
};

// Watchers Sagas
export const searchTopicsSaga = function*() {
  yield* takeLatest(SEARCH_TOPICS_REQUESTED, searchTopics);
};

export default [
  searchTopicsSaga
];
